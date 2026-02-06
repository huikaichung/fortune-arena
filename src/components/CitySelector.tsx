'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CitySelector.module.css';

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// 常用城市列表（MVP 版本）
const CITIES: City[] = [
  // 台灣
  { name: '台北', country: '台灣', latitude: 25.033, longitude: 121.565, timezone: 'Asia/Taipei' },
  { name: '新北', country: '台灣', latitude: 25.012, longitude: 121.465, timezone: 'Asia/Taipei' },
  { name: '桃園', country: '台灣', latitude: 24.994, longitude: 121.301, timezone: 'Asia/Taipei' },
  { name: '台中', country: '台灣', latitude: 24.147, longitude: 120.674, timezone: 'Asia/Taipei' },
  { name: '台南', country: '台灣', latitude: 22.999, longitude: 120.227, timezone: 'Asia/Taipei' },
  { name: '高雄', country: '台灣', latitude: 22.627, longitude: 120.301, timezone: 'Asia/Taipei' },
  { name: '新竹', country: '台灣', latitude: 24.807, longitude: 120.969, timezone: 'Asia/Taipei' },
  { name: '基隆', country: '台灣', latitude: 25.128, longitude: 121.739, timezone: 'Asia/Taipei' },
  { name: '嘉義', country: '台灣', latitude: 23.480, longitude: 120.449, timezone: 'Asia/Taipei' },
  { name: '彰化', country: '台灣', latitude: 24.081, longitude: 120.538, timezone: 'Asia/Taipei' },
  { name: '屏東', country: '台灣', latitude: 22.682, longitude: 120.484, timezone: 'Asia/Taipei' },
  { name: '宜蘭', country: '台灣', latitude: 24.752, longitude: 121.753, timezone: 'Asia/Taipei' },
  { name: '花蓮', country: '台灣', latitude: 23.992, longitude: 121.601, timezone: 'Asia/Taipei' },
  { name: '台東', country: '台灣', latitude: 22.756, longitude: 121.145, timezone: 'Asia/Taipei' },
  { name: '南投', country: '台灣', latitude: 23.916, longitude: 120.664, timezone: 'Asia/Taipei' },
  { name: '苗栗', country: '台灣', latitude: 24.560, longitude: 120.821, timezone: 'Asia/Taipei' },
  { name: '雲林', country: '台灣', latitude: 23.709, longitude: 120.431, timezone: 'Asia/Taipei' },
  
  // 香港、澳門
  { name: '香港', country: '香港', latitude: 22.320, longitude: 114.169, timezone: 'Asia/Hong_Kong' },
  { name: '九龍', country: '香港', latitude: 22.318, longitude: 114.170, timezone: 'Asia/Hong_Kong' },
  { name: '澳門', country: '澳門', latitude: 22.199, longitude: 113.544, timezone: 'Asia/Macau' },
  
  // 中國大陸主要城市
  { name: '北京', country: '中國', latitude: 39.904, longitude: 116.407, timezone: 'Asia/Shanghai' },
  { name: '上海', country: '中國', latitude: 31.230, longitude: 121.474, timezone: 'Asia/Shanghai' },
  { name: '廣州', country: '中國', latitude: 23.129, longitude: 113.264, timezone: 'Asia/Shanghai' },
  { name: '深圳', country: '中國', latitude: 22.543, longitude: 114.058, timezone: 'Asia/Shanghai' },
  { name: '杭州', country: '中國', latitude: 30.275, longitude: 120.155, timezone: 'Asia/Shanghai' },
  { name: '南京', country: '中國', latitude: 32.060, longitude: 118.797, timezone: 'Asia/Shanghai' },
  { name: '成都', country: '中國', latitude: 30.573, longitude: 104.066, timezone: 'Asia/Shanghai' },
  { name: '重慶', country: '中國', latitude: 29.563, longitude: 106.551, timezone: 'Asia/Shanghai' },
  { name: '武漢', country: '中國', latitude: 30.593, longitude: 114.305, timezone: 'Asia/Shanghai' },
  { name: '西安', country: '中國', latitude: 34.264, longitude: 108.943, timezone: 'Asia/Shanghai' },
  { name: '天津', country: '中國', latitude: 39.084, longitude: 117.201, timezone: 'Asia/Shanghai' },
  { name: '蘇州', country: '中國', latitude: 31.299, longitude: 120.585, timezone: 'Asia/Shanghai' },
  { name: '廈門', country: '中國', latitude: 24.480, longitude: 118.089, timezone: 'Asia/Shanghai' },
  { name: '青島', country: '中國', latitude: 36.067, longitude: 120.383, timezone: 'Asia/Shanghai' },
  { name: '大連', country: '中國', latitude: 38.914, longitude: 121.615, timezone: 'Asia/Shanghai' },
  { name: '長沙', country: '中國', latitude: 28.228, longitude: 112.939, timezone: 'Asia/Shanghai' },
  { name: '鄭州', country: '中國', latitude: 34.758, longitude: 113.665, timezone: 'Asia/Shanghai' },
  { name: '瀋陽', country: '中國', latitude: 41.805, longitude: 123.432, timezone: 'Asia/Shanghai' },
  { name: '哈爾濱', country: '中國', latitude: 45.803, longitude: 126.535, timezone: 'Asia/Shanghai' },
  { name: '福州', country: '中國', latitude: 26.075, longitude: 119.306, timezone: 'Asia/Shanghai' },
  { name: '濟南', country: '中國', latitude: 36.651, longitude: 117.121, timezone: 'Asia/Shanghai' },
  { name: '昆明', country: '中國', latitude: 25.042, longitude: 102.712, timezone: 'Asia/Shanghai' },
  { name: '南寧', country: '中國', latitude: 22.817, longitude: 108.366, timezone: 'Asia/Shanghai' },
  { name: '合肥', country: '中國', latitude: 31.821, longitude: 117.227, timezone: 'Asia/Shanghai' },
  { name: '長春', country: '中國', latitude: 43.817, longitude: 125.324, timezone: 'Asia/Shanghai' },
  { name: '無錫', country: '中國', latitude: 31.491, longitude: 120.312, timezone: 'Asia/Shanghai' },
  { name: '寧波', country: '中國', latitude: 29.868, longitude: 121.544, timezone: 'Asia/Shanghai' },
  { name: '東莞', country: '中國', latitude: 23.043, longitude: 113.763, timezone: 'Asia/Shanghai' },
  { name: '貴陽', country: '中國', latitude: 26.647, longitude: 106.630, timezone: 'Asia/Shanghai' },
  { name: '太原', country: '中國', latitude: 37.870, longitude: 112.549, timezone: 'Asia/Shanghai' },
  { name: '烏魯木齊', country: '中國', latitude: 43.825, longitude: 87.617, timezone: 'Asia/Urumqi' },
  { name: '拉薩', country: '中國', latitude: 29.652, longitude: 91.172, timezone: 'Asia/Shanghai' },
  
  // 日本
  { name: '東京', country: '日本', latitude: 35.682, longitude: 139.759, timezone: 'Asia/Tokyo' },
  { name: '大阪', country: '日本', latitude: 34.694, longitude: 135.502, timezone: 'Asia/Tokyo' },
  { name: '京都', country: '日本', latitude: 35.021, longitude: 135.754, timezone: 'Asia/Tokyo' },
  { name: '名古屋', country: '日本', latitude: 35.181, longitude: 136.906, timezone: 'Asia/Tokyo' },
  { name: '福岡', country: '日本', latitude: 33.590, longitude: 130.402, timezone: 'Asia/Tokyo' },
  { name: '札幌', country: '日本', latitude: 43.062, longitude: 141.354, timezone: 'Asia/Tokyo' },
  { name: '橫濱', country: '日本', latitude: 35.444, longitude: 139.638, timezone: 'Asia/Tokyo' },
  { name: '神戶', country: '日本', latitude: 34.691, longitude: 135.183, timezone: 'Asia/Tokyo' },
  { name: '沖繩', country: '日本', latitude: 26.212, longitude: 127.681, timezone: 'Asia/Tokyo' },
  
  // 韓國
  { name: '首爾', country: '韓國', latitude: 37.566, longitude: 126.978, timezone: 'Asia/Seoul' },
  { name: '釜山', country: '韓國', latitude: 35.180, longitude: 129.076, timezone: 'Asia/Seoul' },
  { name: '仁川', country: '韓國', latitude: 37.456, longitude: 126.705, timezone: 'Asia/Seoul' },
  { name: '大邱', country: '韓國', latitude: 35.871, longitude: 128.602, timezone: 'Asia/Seoul' },
  
  // 東南亞
  { name: '新加坡', country: '新加坡', latitude: 1.352, longitude: 103.820, timezone: 'Asia/Singapore' },
  { name: '吉隆坡', country: '馬來西亞', latitude: 3.139, longitude: 101.687, timezone: 'Asia/Kuala_Lumpur' },
  { name: '曼谷', country: '泰國', latitude: 13.756, longitude: 100.502, timezone: 'Asia/Bangkok' },
  { name: '雅加達', country: '印尼', latitude: -6.200, longitude: 106.845, timezone: 'Asia/Jakarta' },
  { name: '馬尼拉', country: '菲律賓', latitude: 14.600, longitude: 120.984, timezone: 'Asia/Manila' },
  { name: '河內', country: '越南', latitude: 21.029, longitude: 105.852, timezone: 'Asia/Ho_Chi_Minh' },
  { name: '胡志明市', country: '越南', latitude: 10.823, longitude: 106.630, timezone: 'Asia/Ho_Chi_Minh' },
  
  // 美洲
  { name: '紐約', country: '美國', latitude: 40.713, longitude: -74.006, timezone: 'America/New_York' },
  { name: '洛杉磯', country: '美國', latitude: 34.052, longitude: -118.244, timezone: 'America/Los_Angeles' },
  { name: '舊金山', country: '美國', latitude: 37.775, longitude: -122.419, timezone: 'America/Los_Angeles' },
  { name: '芝加哥', country: '美國', latitude: 41.878, longitude: -87.630, timezone: 'America/Chicago' },
  { name: '休士頓', country: '美國', latitude: 29.760, longitude: -95.370, timezone: 'America/Chicago' },
  { name: '西雅圖', country: '美國', latitude: 47.607, longitude: -122.332, timezone: 'America/Los_Angeles' },
  { name: '波士頓', country: '美國', latitude: 42.361, longitude: -71.057, timezone: 'America/New_York' },
  { name: '華盛頓', country: '美國', latitude: 38.907, longitude: -77.037, timezone: 'America/New_York' },
  { name: '溫哥華', country: '加拿大', latitude: 49.283, longitude: -123.121, timezone: 'America/Vancouver' },
  { name: '多倫多', country: '加拿大', latitude: 43.653, longitude: -79.383, timezone: 'America/Toronto' },
  
  // 歐洲
  { name: '倫敦', country: '英國', latitude: 51.507, longitude: -0.128, timezone: 'Europe/London' },
  { name: '巴黎', country: '法國', latitude: 48.857, longitude: 2.352, timezone: 'Europe/Paris' },
  { name: '柏林', country: '德國', latitude: 52.520, longitude: 13.405, timezone: 'Europe/Berlin' },
  { name: '阿姆斯特丹', country: '荷蘭', latitude: 52.367, longitude: 4.904, timezone: 'Europe/Amsterdam' },
  { name: '羅馬', country: '義大利', latitude: 41.902, longitude: 12.496, timezone: 'Europe/Rome' },
  { name: '馬德里', country: '西班牙', latitude: 40.417, longitude: -3.704, timezone: 'Europe/Madrid' },
  { name: '雪梨', country: '澳洲', latitude: -33.869, longitude: 151.209, timezone: 'Australia/Sydney' },
  { name: '墨爾本', country: '澳洲', latitude: -37.814, longitude: 144.963, timezone: 'Australia/Melbourne' },
  { name: '奧克蘭', country: '紐西蘭', latitude: -36.849, longitude: 174.762, timezone: 'Pacific/Auckland' },
];

interface CitySelectorProps {
  value: City | null;
  onChange: (city: City | null) => void;
  placeholder?: string;
}

export function CitySelector({ value, onChange, placeholder = '搜索城市...' }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 過濾城市
  const filteredCities = search.trim()
    ? CITIES.filter(
        (city) =>
          city.name.includes(search) ||
          city.country.includes(search) ||
          city.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 20)
    : CITIES.slice(0, 20);

  // 點擊外部關閉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 鍵盤導航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((prev) => Math.min(prev + 1, filteredCities.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filteredCities.length) {
          handleSelect(filteredCities[highlightIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (city: City) => {
    onChange(city);
    setSearch('');
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleClear = () => {
    onChange(null);
    setSearch('');
    inputRef.current?.focus();
  };

  // 滾動到高亮項目
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightIndex]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder={value ? `${value.name}, ${value.country}` : placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setHighlightIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button type="button" className={styles.clearBtn} onClick={handleClear}>
            ✕
          </button>
        )}
        <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.dropdown} ref={listRef}>
          {filteredCities.length === 0 ? (
            <div className={styles.empty}>找不到符合的城市</div>
          ) : (
            filteredCities.map((city, index) => (
              <div
                key={`${city.name}-${city.country}`}
                className={`${styles.option} ${index === highlightIndex ? styles.highlighted : ''} ${
                  value?.name === city.name && value?.country === city.country ? styles.selected : ''
                }`}
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                <span className={styles.cityName}>{city.name}</span>
                <span className={styles.countryName}>{city.country}</span>
              </div>
            ))
          )}
        </div>
      )}

      {value && (
        <div className={styles.selectedInfo}>
          <span className={styles.coords}>
            📍 {value.latitude.toFixed(2)}°, {value.longitude.toFixed(2)}°
          </span>
        </div>
      )}
    </div>
  );
}
