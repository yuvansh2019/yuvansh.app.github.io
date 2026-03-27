
import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../types';

interface PricingCardProps {
  item: ServiceItem;
}

interface AddOn {
  id: string;
  label: string;
  price: number;
  recurring?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ item }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [tier, setTier] = useState<'standard' | 'enterprise'>('standard');
  const [inputCoupon, setInputCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleApplyCoupon = () => {
    setAppliedCoupon(inputCoupon.trim().toUpperCase());
  };

  const is20PercentOff = appliedCoupon === 'YJ20';
  const isFreeEligible = appliedCoupon === 'GTFREE' && tier !== 'enterprise';
  const isCodeActive = is20PercentOff || (appliedCoupon === 'GTFREE');
  const isActuallyFree = isFreeEligible;

  const addOns = useMemo(() => {
    const list: AddOn[] = [];
    
    // Global Inform me option
    list.push({ id: 'inform', label: 'Inform me (Discount)', price: -1 });

    if (item.id === 'website') {
      list.push({ id: 'subdomain', label: 'Subdomain Setup', price: 10 });
      list.push({ id: 'domain-extra', label: 'Premium SSL Cert', price: 50 });
    } else if (item.id === 'app') {
      list.push({ id: 'playstore', label: 'Published on Play Store', price: 25 });
      list.push({ id: 'appstore', label: 'Published on App Store', price: 99 });
      list.push({ id: 'other', label: 'Cross-Platform Build', price: 200 });
    } else if (item.id === 'browser') {
      list.push({ id: 'chrome', label: 'Chromium Engine Base', price: 0 });
      list.push({ id: 'design', label: 'Bespoke UI Design', price: 500 });
    } else if (item.id === 'domain') {
      if (tier === 'enterprise') {
        list.push({ id: 'ai-setup', label: '.AI Domain Setup', price: 50000, recurring: 919 });
        list.push({ id: 'info-setup', label: '.info Domain', price: 9 });
      }
    }
    
    return list;
  }, [item.id, tier]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const totalPriceDisplay = useMemo(() => {
    if (isActuallyFree) return '$0';

    // Parse base price
    let base = 0;
    const priceStr = item.price.split('+')[0].replace(/[$,/yrM]/g, '').replace(',', '').trim();
    
    if (item.price.includes('M')) {
      base = parseFloat(priceStr) * 1000000;
    } else {
      base = parseFloat(priceStr) || 0;
    }

    // Add Enterprise Premium if applicable
    if (tier === 'enterprise') {
      if (item.id === 'domain') base += 10000; // Enterprise Domain base premium
      else if (item.id === 'super-app') base += 500;
      else base *= 2; 
    }

    let upfrontTotal = base;
    let recurringTotal = 0;

    selectedAddOns.forEach(id => {
      const found = addOns.find(a => a.id === id);
      if (found) {
        upfrontTotal += found.price;
        if (found.recurring) recurringTotal += found.recurring;
      }
    });

    if (is20PercentOff) {
      upfrontTotal *= 0.8;
      recurringTotal *= 0.8;
    }

    let formattedUpfront = '';
    if (upfrontTotal >= 1000000) {
      formattedUpfront = `$${(upfrontTotal / 1000000).toFixed(1)}M`;
    } else {
      formattedUpfront = `$${Math.round(upfrontTotal).toLocaleString()}`;
    }

    const formattedRecurring = recurringTotal > 0 ? ` + $${Math.round(recurringTotal).toLocaleString()}/yr` : '';

    return `${formattedUpfront}${formattedRecurring}`;
  }, [item.price, selectedAddOns, addOns, is20PercentOff, isActuallyFree, tier]);

  return (
    <div className={`relative p-8 rounded-3xl border transition-all duration-500 group flex flex-col h-full ${
      item.isPopular 
        ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/50 shadow-2xl shadow-blue-500/10' 
        : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
    } ${showMoreInfo ? 'ring-2 ring-blue-500/20 scale-[1.02]' : 'hover:-translate-y-2'}`}>
      
      {item.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest z-10 shadow-lg">
          Best Value
        </span>
      )}

      {isCodeActive && (
        <span className={`absolute top-4 right-4 text-[9px] font-black px-2 py-0.5 rounded-md border uppercase animate-pulse ${
          isActuallyFree ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
          (appliedCoupon === 'GTFREE' && tier === 'enterprise') ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-none' :
          'bg-blue-500/20 text-blue-400 border-blue-500/30'
        }`}>
          {isActuallyFree ? 'FREE ACTIVE' : (appliedCoupon === 'GTFREE' && tier === 'enterprise') ? 'FREE BLOCKED ON ENT' : '20% OFF'}
        </span>
      )}
      
      <div className="flex-grow">
        {/* Tier Switcher */}
        <div className="flex p-1 bg-black/40 rounded-xl mb-6 border border-white/5">
          <button 
            onClick={() => setTier('standard')}
            className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              tier === 'standard' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            Standard
          </button>
          <button 
            onClick={() => setTier('enterprise')}
            className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              tier === 'enterprise' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            Enterprise
          </button>
        </div>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-all duration-300 ${
          item.isPopular ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-800 text-gray-400 group-hover:text-blue-400'
        }`}>
          <i className={`fa-solid ${item.icon}`}></i>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.name}</h3>
        
        <div className="flex flex-col mb-4">
          <span className={`font-black text-white tracking-tight transition-all duration-500 ${totalPriceDisplay.length > 15 ? 'text-lg' : 'text-3xl'}`}>
            {totalPriceDisplay}
          </span>
          {tier === 'enterprise' && <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Enterprise Tier</span>}
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="mb-6">
          <button 
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="group/btn text-blue-400 text-sm font-bold flex items-center gap-2 hover:text-blue-300 transition-colors mb-4 uppercase tracking-tighter"
          >
            {showMoreInfo ? 'Hide Customization' : 'Customize Plan'}
            <i className={`fa-solid fa-chevron-${showMoreInfo ? 'up' : 'down'} text-[10px] transition-transform duration-300 ${showMoreInfo ? '' : 'group-hover:translate-y-0.5'}`}></i>
          </button>
          
          <div className={`space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${
            showMoreInfo ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-3">
              {addOns.length > 0 ? addOns.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`w-full flex justify-between items-center p-2.5 rounded-xl transition-all border ${
                    selectedAddOns.includes(addon.id) 
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-100' 
                      : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 text-left">
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                      selectedAddOns.includes(addon.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
                    }`}>
                      {selectedAddOns.includes(addon.id) && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                    </div>
                    <span className="text-[11px] font-bold leading-tight">{addon.label}</span>
                  </div>
                  {addon.price !== 0 && (
                    <span className={`text-[10px] font-black ml-2 ${selectedAddOns.includes(addon.id) ? 'text-blue-400' : 'text-gray-500'}`}>
                      {addon.price > 0 ? '+' : '-'}${Math.abs(addon.price).toLocaleString()}
                      {addon.recurring ? ` /yr` : ''}
                    </span>
                  )}
                </button>
              )) : <p className="text-[10px] text-gray-600 text-center py-2">No additional add-ons for this tier.</p>}

              <div className="pt-2 border-t border-white/5 mt-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 uppercase transition-all font-bold tracking-widest"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-4 py-2 rounded-lg transition-all uppercase active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {appliedCoupon && (
                <p className={`text-[9px] pt-1 italic text-center font-bold ${
                  (appliedCoupon === 'GTFREE' && tier === 'enterprise') ? 'text-red-500' : 'text-green-500'
                }`}>
                  {(appliedCoupon === 'GTFREE' && tier === 'enterprise') ? 'GTFREE disabled on Enterprise' : `Coupon "${appliedCoupon}" Applied`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button className={`w-full py-4 rounded-xl font-black uppercase tracking-tighter transition-all mt-4 ${
        item.isPopular 
          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-95' 
          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 active:scale-95'
      }`}>
        Reserve Now
      </button>
    </div>
  );
};

export default PricingCard;
