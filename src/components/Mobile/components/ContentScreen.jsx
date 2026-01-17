import React, { memo, useState, useEffect } from "react";
import dayjs from 'dayjs';
import Dock from './Dock';
import HomeIndicator from './HomeIndicator';

const iosApps = [
  { id: 1, name: "LeetCode", icon: "/icons/leetcode.svg", color: "from-orange-400 to-orange-500", screen: "leetcode", url: "https://leetcode.com/u/Adaharsh/" },
  { id: 2, name: "GFG", icon: "/icons/gfg.svg", color: "from-green-400 to-green-500", screen: "gfg", url: "https://www.geeksforgeeks.org/user/mraadarshkumarsingh/" },
  { id: 3, name: "Crave", icon: "/icons/Crave.png", color: "from-red-500 to-pink-600", screen: "crave" },
  { id: 4, name: "Weather", icon: "/icons/weather.png", color: "from-blue-400 to-blue-600", screen: "weather" },
  { id: 5, name: "GitHub", icon: "/icons/github.svg", color: "from-gray-700 to-gray-900", screen: "github", url: "https://github.com/adaharshsingh" },
  { id: 6, name: "GTA VI", icon: "/icons/gta6.png", color: "from-blue-600 to-blue-800", screen: "gta6" },
  { id: 7, name: "URBN", icon: "/icons/Urbn.png", color: "from-purple-500 to-purple-700", screen: "urbn" },
  { id: 8, name: "Apply", icon: "/icons/Applyd.png", color: "from-blue-500 to-indigo-600", screen: "apply" },
];

const AppIcon = memo(({ app, onClick }) => {
  const handleClick = () => {
    if (app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    } else {
      onClick(app.screen);
    }
  };

  const isImageIcon = app.icon.endsWith('.png') || app.icon.endsWith('.jpg');

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <button
        onClick={handleClick}
        className={`w-14 h-14 rounded-[14px] ${isImageIcon ? '' : `bg-gradient-to-br ${app.color}`} flex items-center justify-center shadow-lg transition-all duration-150 ease-out hover:scale-105 hover:brightness-110 active:scale-90 ${isImageIcon ? 'p-0' : 'p-3'} touch-manipulation outline-none focus:outline-none overflow-hidden`}
      >
        <img 
          src={app.icon} 
          alt={app.name} 
          className="w-full h-full object-contain" 
          style={isImageIcon ? {} : { filter: 'brightness(0) invert(1)' }} 
        />
      </button>
      <span className="text-[10px] text-white font-medium drop-shadow-md">{app.name}</span>
    </div>
  );
});

AppIcon.displayName = 'AppIcon';



const LeetCodeScreen = memo(() => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-orange-400">LeetCode</h2>
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold">350+</p>
          <p className="text-xs text-gray-400">Problems Solved</p>
        </div>
        <div className="text-orange-400 text-4xl">💻</div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Easy</span>
          <span className="text-green-400 font-semibold">120</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Medium</span>
          <span className="text-yellow-400 font-semibold">180</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Hard</span>
          <span className="text-red-400 font-semibold">50</span>
        </div>
      </div>
    </div>
  </div>
));

LeetCodeScreen.displayName = 'LeetCodeScreen';

const GFGScreen = memo(() => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-green-400">GeeksforGeeks</h2>
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="text-center mb-4">
        <div className="text-5xl mb-2">🎯</div>
        <p className="text-2xl font-bold">250+</p>
        <p className="text-xs text-gray-400">Articles Published</p>
      </div>
      <div className="space-y-3 mt-6">
        <div className="bg-green-500/20 rounded-xl p-3 border border-green-500/30">
          <p className="text-sm font-semibold">DSA Practice</p>
          <p className="text-xs text-gray-300 mt-1">Data Structures & Algorithms</p>
        </div>
        <div className="bg-green-500/20 rounded-xl p-3 border border-green-500/30">
          <p className="text-sm font-semibold">Competitive Programming</p>
          <p className="text-xs text-gray-300 mt-1">Contest Participation</p>
        </div>
      </div>
    </div>
  </div>
));

GFGScreen.displayName = 'GFGScreen';

const CraveScreen = memo(({ onBack }) => (
  <div className="flex flex-col h-full bg-black">
    <iframe
      src="https://hangry-alpha.vercel.app/"
      className="w-full h-full border-0"
      title="Crave Food Delivery"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
));

CraveScreen.displayName = 'CraveScreen';

const WeatherScreen = memo(({ onBack }) => (
  <div className="flex flex-col h-full bg-black">
    <iframe
      src="https://propacity-alpha.vercel.app/"
      className="w-full h-full border-0"
      title="Propacity Real Estate"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
));

WeatherScreen.displayName = 'WeatherScreen';

const GTA6Screen = memo(({ onBack }) => (
  <div className="flex flex-col h-full bg-black">
    <iframe
      src="https://gta-vi-brown.vercel.app/"
      className="w-full h-full border-0"
      title="GTA VI Website"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
));

GTA6Screen.displayName = 'GTA6Screen';

const GitHubScreen = memo(() => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">GitHub</h2>
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
          💻
        </div>
        <div>
          <h3 className="font-bold text-lg">Adarsh Kumar</h3>
          <p className="text-sm text-gray-400">@yourusername</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold">45</p>
          <p className="text-xs text-gray-400">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">1.2k</p>
          <p className="text-xs text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">180</p>
          <p className="text-xs text-gray-400">Following</p>
        </div>
      </div>
    </div>
  </div>
));

GitHubScreen.displayName = 'GitHubScreen';

const XScreen = memo(() => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">X</h2>
    <div className="space-y-3">
      {[
        { user: "Tech News", handle: "@technews", tweet: "Breaking: New AI breakthrough announced today! 🚀", time: "2h" },
        { user: "Dev Community", handle: "@devcommunity", tweet: "10 React tips every developer should know", time: "5h" },
        { user: "Code Daily", handle: "@codedaily", tweet: "JavaScript one-liners that will blow your mind 🤯", time: "8h" },
      ].map((post, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{post.user}</span>
                <span className="text-xs text-gray-400">{post.handle} · {post.time}</span>
              </div>
              <p className="text-sm mt-1 text-gray-200">{post.tweet}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

XScreen.displayName = 'XScreen';

const URBNScreen = memo(({ onBack }) => (
  <div className="flex flex-col h-full bg-black">
    <iframe
      src="https://urbn-five.vercel.app/"
      className="w-full h-full border-0"
      title="URBN Fashion Store"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
));

URBNScreen.displayName = 'URBNScreen';

const ApplyScreen = memo(({ onBack }) => (
  <div className="flex flex-col h-full bg-black">
    <iframe
      src="https://applyd.online/"
      className="w-full h-full border-0"
      title="Applyd Job Tracker"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
));

ApplyScreen.displayName = 'ApplyScreen';

const ContentScreen = memo(({ setFocusPhone }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [currentTime, setCurrentTime] = useState(dayjs().format('H:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('H:mm'));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (currentScreen === "home") {
      setFocusPhone(false);
    } else {
      setCurrentScreen("home");
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Status Bar with Dynamic Island */}}
      <div className="relative px-4 -mt-2 pb-1">
        <div className="flex justify-between items-center text-white text-[11px]">
          {/* Left side - Time */}
          <span className="font-semibold">{currentTime}</span>
          
          {/* Center - Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-3">
            <img src="/icons/Dynamic Island.png" alt="Dynamic Island" className="h-7 w-auto object-contain" />
          </div>
          
          {/* Right side - Status Icons */}
          <div className="flex items-center gap-1">
            {/* Tower Strength */}            {/* Signal Strength */}
            <div className="flex items-end gap-[1px] h-2.5">
              <div className="w-[2px] h-1/4 bg-white rounded-sm"></div>
              <div className="w-[2px] h-1/2 bg-white rounded-sm"></div>
              <div className="w-[2px] h-3/4 bg-white rounded-sm"></div>
              <div className="w-[2px] h-full bg-white rounded-sm"></div>
            </div>
            {/* WiFi */}
            <img src="/pngimg.com - wifi_PNG62364.png" alt="wifi" className="w-7 h-3 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            {/* Battery */}
            <img src="/icons/Charge status=Medium, Dark=False.png" alt="battery" className="w-6 h-2.5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${currentScreen === "crave" || currentScreen === "apply" || currentScreen === "urbn" || currentScreen === "weather" || currentScreen === "gta6" ? "px-0 pb-0" : "px-6 pb-6"}`}>
        {currentScreen === "home" ? (
          <div className="space-y-8 pt-4">
            {/* Widget Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  👨‍💻
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Adarsh Kumar</h2>
                  <p className="text-sm text-gray-300">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                Creating immersive web experiences with React, Three.js, and modern technologies.
              </p>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-4 gap-6">
              {iosApps.map((app) => (
                <AppIcon key={app.id} app={app} onClick={handleScreenChange} />
              ))}
            </div>
          </div>
        ) : currentScreen === "leetcode" ? (
          <LeetCodeScreen />
        ) : currentScreen === "gfg" ? (
          <GFGScreen />
        ) : currentScreen === "crave" ? (
          <CraveScreen onBack={() => setCurrentScreen("home")} />
        ) : currentScreen === "weather" ? (
          <WeatherScreen onBack={() => setCurrentScreen("home")} />
        ) : currentScreen === "gta6" ? (
          <GTA6Screen onBack={() => setCurrentScreen("home")} />
        ) : currentScreen === "github" ? (
          <GitHubScreen />
        ) : currentScreen === "x" ? (
          <XScreen />
        ) : currentScreen === "urbn" ? (
          <URBNScreen onBack={() => setCurrentScreen("home")} />
        ) : currentScreen === "apply" ? (
          <ApplyScreen onBack={() => setCurrentScreen("home")} />
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <span className="text-6xl mb-4 block">🚀</span>
              <p className="text-sm text-gray-300">This feature is coming soon!</p>
            </div>
          </div>
        )}
      </div>

      {/* iOS-like Dock */}
      {currentScreen !== "crave" && currentScreen !== "apply" && currentScreen !== "urbn" && currentScreen !== "weather" && currentScreen !== "gta6" && <Dock onScreenChange={handleScreenChange} />}
      
      {/* iOS Home Indicator - Swipe up to go home */}
      {currentScreen !== "home" && (
        <div className="w-full flex justify-center pb-3 relative z-50">
          <HomeIndicator onSwipeUp={() => setCurrentScreen("home")} />
        </div>
      )}
    </div>
  );
});

ContentScreen.displayName = 'ContentScreen';

export default ContentScreen;
