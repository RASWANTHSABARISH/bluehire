import React, { useState, useEffect, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';

export default function LocationSelector({ 
  countryValue, 
  stateValue, 
  cityValue, 
  onCountryChange,
  onStateChange,
  onCityChange 
}) {
  // Memoize all countries
  const countries = useMemo(() => Country.getAllCountries(), []);

  // Determine selected Country ISO code based on the string name (e.g. "India" -> "IN")
  const selectedCountryObj = countries.find(c => c.name === countryValue) || null;
  const countryCode = selectedCountryObj ? selectedCountryObj.isoCode : '';

  // Get states for the selected country
  const states = useMemo(() => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode);
  }, [countryCode]);

  // Determine selected State ISO code based on string name
  const selectedStateObj = states.find(s => s.name === stateValue) || null;
  const stateCode = selectedStateObj ? selectedStateObj.isoCode : '';

  // Get cities for the selected state
  const cities = useMemo(() => {
    if (!countryCode || !stateCode) return [];
    return City.getCitiesOfState(countryCode, stateCode);
  }, [countryCode, stateCode]);

  const [customMode, setCustomMode] = useState({ state: false, city: false });

  // Handle initialization of custom mode if data exists but isn't in dropdowns
  useEffect(() => {
    if (countryCode && stateValue && states.length > 0) {
      if (!states.some(s => s.name === stateValue)) {
        setCustomMode(prev => ({ ...prev, state: true }));
      }
    }
  }, [countryCode, stateValue, states]);

  useEffect(() => {
    if (countryCode && stateCode && cityValue && cities.length > 0) {
      if (!cities.some(c => c.name === cityValue)) {
        setCustomMode(prev => ({ ...prev, city: true }));
      }
    }
  }, [countryCode, stateCode, cityValue, cities]);

  const handleCountryChange = (e) => {
    const val = e.target.value;
    if (onCountryChange) onCountryChange(val);
    if (onStateChange) onStateChange('');
    if (onCityChange) onCityChange('');
    setCustomMode({ state: false, city: false });
  };

  const handleStateChange = (e) => {
    const val = e.target.value;
    if (val === 'OTHER_CUSTOM_STATE') {
      setCustomMode(prev => ({ ...prev, state: true }));
      if (onStateChange) onStateChange('');
    } else {
      if (onStateChange) onStateChange(val);
      if (onCityChange) onCityChange('');
      setCustomMode(prev => ({ ...prev, city: false }));
    }
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    if (val === 'OTHER_CUSTOM_CITY') {
      setCustomMode(prev => ({ ...prev, city: true }));
      if (onCityChange) onCityChange('');
    } else {
      if (onCityChange) onCityChange(val);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {/* Country Dropdown */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-deep)' }}>
          Country
        </label>
        <select 
          className="form-input-premium" 
          value={countryValue || ''} 
          onChange={handleCountryChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.isoCode} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* State Dropdown / Input */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-deep)' }}>
          State / Province
        </label>
        {customMode.state ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-input-premium" 
              value={stateValue || ''} 
              onChange={(e) => onStateChange && onStateChange(e.target.value)} 
              placeholder="Enter state" 
              required 
            />
            <button 
              type="button" 
              onClick={() => { setCustomMode(prev => ({ ...prev, state: false })); if(onStateChange) onStateChange(''); }}
              style={{ padding: '0 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              title="Select from list"
            >
              List
            </button>
          </div>
        ) : (
          <select 
            className="form-input-premium" 
            value={stateValue || ''} 
            onChange={handleStateChange}
            disabled={!countryValue}
            required
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.isoCode} value={s.name}>{s.name}</option>
            ))}
            <option value="OTHER_CUSTOM_STATE">+ Other (Type manually)</option>
          </select>
        )}
      </div>

      {/* City Dropdown / Input */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-deep)' }}>
          City / Area
        </label>
        {customMode.city ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-input-premium" 
              value={cityValue || ''} 
              onChange={(e) => onCityChange && onCityChange(e.target.value)} 
              placeholder="Enter city or area" 
              required 
            />
            <button 
              type="button" 
              onClick={() => { setCustomMode(prev => ({ ...prev, city: false })); if(onCityChange) onCityChange(''); }}
              style={{ padding: '0 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              title="Select from list"
            >
              List
            </button>
          </div>
        ) : (
          <select 
            className="form-input-premium" 
            value={cityValue || ''} 
            onChange={handleCityChange}
            disabled={!stateValue || customMode.state}
            required
          >
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
            <option value="OTHER_CUSTOM_CITY">+ Other (Type manually)</option>
          </select>
        )}
      </div>
    </div>
  );
}
