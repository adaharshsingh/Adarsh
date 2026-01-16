import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Clock12Hour from "./Clock12Hour";
import Clock24Hour from "./Clock24Hour";
import { GlowingEffect } from "./glowing-effect";

const RealPhone = () => {
  const [activeApp, setActiveApp] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [recentApps, setRecentApps] = useState([]);
  const phoneRef = useRef(null);
  const appGridRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) {
      gsap.from(phoneRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (appGridRef.current && !activeApp) {
      const apps = appGridRef.current.querySelectorAll("[data-app-icon]");
      gsap.to(apps, {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out",
      });
    }
  }, [activeApp]);

  const handleOpenApp = (appUrl) => {
    if (iframeRef.current) {
      gsap.to(iframeRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    setActiveApp(appUrl);
    setRecentApps((prev) => {
      const filtered = prev.filter((url) => url !== appUrl);
      return [appUrl, ...filtered].slice(0, 5);
    });
  };

  const handleAppClick = (app) => {
    if (app.action.toString().includes("handleOpenApp")) {
      const url = app.action.toString().match(/https?[^"')]+/)?.[0];
      if (url) handleOpenApp(url);
    } else {
      app.action();
    }
  };

  const apps = React.useMemo(() => [
    {
      name: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png",
      action: () => window.open("https://www.linkedin.com/in/adarsh-kumar-singh-226228239/", "_blank"),
    },
    {
      name: "Resume",
      icon: "https://www.freeiconspng.com/uploads/resume-icon-png-2.png",
      action: () => window.open("https://drive.google.com/uc?export=download&id=1_5Uyn6pQfArTEFSvqLRoXR9xdXb2Dl7v", "_blank"),
    },
    {
      name: "Gmail",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png",
      action: () => window.open("mailto:Mr.aadarshkumarsingh@gmail.com", "_blank"),
    },
    {
      name: "LeetCode",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      action: () => window.open("https://leetcode.com/u/Adaharsh/", "_blank"),
    },
    {
      name: "GFG",
      icon: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png",
      action: () => window.open("https://www.geeksforgeeks.org/user/mraadarshkumarsingh/", "_blank"),
    },
    {
      name: "Uber",
      icon: "https://www.logo.wine/a/logo/Uber/Uber-App-Icon-Logo.wine.svg",
      action: () => handleOpenApp("https://uber-hazel-kappa.vercel.app/"),
    },
    {
      name: "Swiggy",
      icon: "https://www.logo.wine/a/logo/Swiggy/Swiggy-Logo.wine.svg",
      action: () => handleOpenApp("https://swiggy-clone.vercel.app/"),
    },
    {
      name: "Weather",
      icon: "https://img.icons8.com/ios-filled/50/partly-cloudy-day.png",
      action: () => handleOpenApp("https://propacity-alpha.vercel.app/"),
    },
    {
      name: "Todo",
      icon: "https://img.icons8.com/ios-filled/50/checklist.png",
      action: () => window.open("https://your-todo-app-link.com", "_blank"),
    },
    {
      name: "X",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgGjv8MNBff1joXJ8HrNetcycvriPVT04xRzq_Pk_A_epyoR2n89jSvG71DYkXpugHGgE&usqp=CAU",
      action: () => window.open("https://twitter.com/yourhandle", "_blank"),
    },
    {
      name: "GitHub",
      icon: "https://img.icons8.com/ios-filled/50/github.png",
      action: () => window.open("https://github.com/adaharshsingh", "_blank"),
    },
    {
      name: "Game",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnPNgV7HaOmvMXzwK6yENNnxpSzBAdW3AFJQ&s",
      action: () => handleOpenApp("https://gta-clone.vercel.app/"),
    },
    {
      name: "GTA",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Grand_Theft_Auto_VI_logo_%28with_gradient%29.svg/2560px-Grand_Theft_Auto_VI_logo_%28with_gradient%29.svg.png",
      action: () => window.open("https://gta-vi-brown.vercel.app/", "_blank"),
    },
  ], []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)", overflow: "auto", padding: "20px" }}>
      <div ref={phoneRef} style={{ perspective: "1000px", position: "relative", width: "100%", maxWidth: "390px", aspectRatio: "9/19.5" }}>
        
        {/* Outer Gold Frame */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "60px",
          background: "linear-gradient(135deg, #D4A574 0%, #C9985D 50%, #A67C52 100%)",
          padding: "12px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)",
          zIndex: 1
        }} />
        
        {/* Inner Display Screen */}
        <div style={{
          position: "absolute",
          inset: "12px",
          borderRadius: "54px",
          background: "#000",
          overflow: "hidden",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.05)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column"
        }}>
          
          {/* Notch */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "160px",
            height: "28px",
            background: "#000",
            borderRadius: "0 0 30px 30px",
            zIndex: 60,
            boxShadow: "0 10px 20px rgba(0,0,0,0.8)"
          }} />

          {/* Status Bar */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 55,
            fontSize: "11px",
            color: "#fff",
            fontWeight: "600",
            height: "24px"
          }}>
            <span><Clock12Hour /></span>
            <div style={{ display: "flex", gap: "4px", fontSize: "9px" }}>
              <span>📡</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* App Grid */}
          {!activeApp && (
            <div ref={appGridRef} style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              paddingTop: "50px",
              paddingBottom: "70px",
              overflow: "hidden"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, 1fr)",
                gap: "14px",
                width: "88%",
                height: "100%",
                padding: "14px",
                color: "white",
                fontSize: "11px",
                textAlign: "center"
              }}>
                {/* eslint-disable-next-line */}
                {apps.map((app, idx) => (
                  <div key={idx} data-app-icon style={{
                    position: "relative",
                    borderRadius: "28px",
                    opacity: 0,
                    transform: "scale(0.8)"
                  }}>
                    <button
                      onClick={() => handleAppClick(app)}
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)",
                        borderRadius: "28px",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.12)";
                        e.currentTarget.style.background = "linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%)";
                        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)";
                      }}
                    >
                      <img src={app.icon} alt={app.name} style={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                      }} />
                    </button>
                    <p style={{ marginTop: "8px", color: "#ffffff", fontSize: "10px", fontWeight: "500", lineHeight: "1.2", opacity: 1 }}>{app.name}</p>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={25} />
                  </div>
                ))}
                {/* Empty slots */}
                <div />
                <div />
                <div />
              </div>
            </div>
          )}

          {/* App Iframe */}
          {activeApp && (
            <div ref={iframeRef} style={{
              position: "absolute",
              left: "12px",
              right: "12px",
              top: "50px",
              bottom: "56px",
              borderRadius: "20px",
              overflow: "hidden",
              zIndex: 15,
              background: "white",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)",
              border: "1px solid rgba(0,0,0,0.1)",
              opacity: 1
            }}>
              <iframe src={activeApp} style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "white"
              }} title="App Viewer" />
            </div>
          )}

          {/* Home Indicator Bar */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "4px",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "2px",
            zIndex: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }} />

          {/* Bottom Navigation */}
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "12px",
            right: "12px",
            height: "42px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 25,
            background: "rgba(50,50,50,0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "0 16px",
            gap: "16px"
          }}>
            <button
              onClick={() => setShowRecent((prev) => !prev)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#888",
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.2s",
                padding: "8px",
                borderRadius: "12px"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#fff";
                e.target.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#888";
                e.target.style.background = "transparent";
              }}
            >
              ☰
            </button>

            <button
              onClick={() => setActiveApp(null)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#888",
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.2s",
                padding: "8px",
                borderRadius: "12px"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#fff";
                e.target.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#888";
                e.target.style.background = "transparent";
              }}
            >
              🏠
            </button>
          </div>

          {/* Recent Apps Panel */}
          {showRecent && (
            <div style={{
              position: "absolute",
              bottom: "75px",
              left: "16px",
              right: "16px",
              background: "rgba(50,50,50,0.9)",
              padding: "14px",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              zIndex: 30,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
            }}>
              <h4 style={{ color: "#fff", fontSize: "13px", marginBottom: "10px", fontWeight: "600" }}>Recent</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {recentApps.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => handleOpenApp(url)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      cursor: "pointer",
                      color: "#fff",
                      fontSize: "10px",
                      transition: "all 0.2s",
                      fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                    }}
                  >
                    {url.split("/")[2]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealPhone;
