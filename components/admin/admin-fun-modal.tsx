"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface AdminFunModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminFunModal({ isOpen, onClose }: AdminFunModalProps) {
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // The password is the same as the one used in the marketplace mod section
  const ADMIN_PASSWORD = "!@MODUITY"

  // Handle mounting animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // Focus the password input after a short delay
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus()
        }
      }, 100)
    } else {
      const timer = setTimeout(() => {
        setMounted(false)
      }, 300) // Match the duration of the fade-out animation
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      // Close the modal
      onClose()
      setPassword("")

      // Activate Dima Client
      activateDimaClient()

      toast({
        title: "Access Granted",
        description: "Dima Client activated successfully.",
      })
    } else {
      // Shake animation for incorrect password
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)

      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const activateDimaClient = () => {
    // This function will execute the Dima Client code
    const dimaClientCode = `(function() {
    // --- Global state and constants ---
    // This initial check MUST be outside the string passed to new Function()
    if (document.getElementById('dima-client-container')) {
        alert('Dima Client is already active or was not properly dismissed.');
        return;
    }

    const DIMA_CLIENT_ID = 'dima-client-container';
    const REQUIRED_KEY = 'g6UujJyXGGuubFESs4YbbKlWTdc3NnKmHEErSqNetFTFY0SZwB';

    // These variables will be in the scope of the new Function
    let autoclickIntervalId = null;
    let isAutoclicking = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let autoclickerKeydownListener = null;
    let mouseMoveListenerGlobal = null;

    let matrixIntervalId = null;
    let matrixCanvas = null;
    let matrixCtx = null;
    const matrixFontSize = 12;
    let matrixColumns = 0;
    let matrixDrops = [];
    const matrixChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()+=_[]{}\\|;:?/.,<>-ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽltal';

    // Define large strings first
    const stylesString = \`
        :root {
           --dima-bg-dark: #282c34; --dima-bg-light: #3a3f4b; --dima-accent: #61afef;
           --dima-text: #abb2bf; --dima-text-bright: #ffffff; --dima-border: #4f5666;
           --dima-shadow: rgba(0, 0, 0, 0.5); --dima-shadow-light: rgba(97, 175, 239, 0.3);
           --dima-success: #98c379; --dima-danger: #e06c75; --dima-rainbow-speed: 4s;
           --dima-animation-duration: 0.3s; --dima-animation-timing: cubic-bezier(0.25, 0.8, 0.25, 1);
           --dima-control-bar-height: 45px;
        }
        #\${DIMA_CLIENT_ID} {
            position: fixed; top: 50px; left: 50px;
            min-height: var(--dima-control-bar-height); width: 520px;
            background-color: var(--dima-bg-dark); border: 1px solid var(--dima-border);
            border-radius: 16px; box-shadow: 0 15px 35px var(--dima-shadow);
            color: var(--dima-text); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            z-index: 9999999 !important; overflow: hidden; display: flex; flex-direction: column;
            opacity: 0; transform: scale(0.9) translateY(20px);
            transition: opacity var(--dima-animation-duration) var(--dima-animation-timing),
                        transform var(--dima-animation-duration) var(--dima-animation-timing),
                        width var(--dima-animation-duration) var(--dima-animation-timing),
                        min-height var(--dima-animation-duration) var(--dima-animation-timing),
                        background-color var(--dima-animation-duration) var(--dima-animation-timing),
                        box-shadow var(--dima-animation-duration) var(--dima-animation-timing);
            user-select: none;
        }
        #\${DIMA_CLIENT_ID}.dima-minimized { width: 220px; min-height: var(--dima-control-bar-height); border-radius: 10px; }
        #\${DIMA_CLIENT_ID}.dima-minimized #dima-main-interface { display: none; }
        #\${DIMA_CLIENT_ID}.dima-minimized #dima-control-bar { border-bottom: none; }
        #\${DIMA_CLIENT_ID}.dima-visible { opacity: 1; transform: scale(1) translateY(0); }
        #\${DIMA_CLIENT_ID}.dima-rainbow-active { animation: dima-rainbow-border var(--dima-rainbow-speed) linear infinite; }
        @keyframes dima-rainbow-border {
            0%, 100% { border-color: hsl(0, 80%, 65%); box-shadow: 0 0 15px hsla(0, 80%, 65%, 0.5); }
            17% { border-color: hsl(60, 80%, 65%); box-shadow: 0 0 15px hsla(60, 80%, 65%, 0.5); }
            33% { border-color: hsl(120, 80%, 65%); box-shadow: 0 0 15px hsla(120, 80%, 65%, 0.5); }
            50% { border-color: hsl(180, 80%, 65%); box-shadow: 0 0 15px hsla(180, 80%, 65%, 0.5); }
            67% { border-color: hsl(240, 80%, 65%); box-shadow: 0 0 15px hsla(240, 80%, 65%, 0.5); }
            83% { border-color: hsl(300, 80%, 65%); box-shadow: 0 0 15px hsla(300, 80%, 65%, 0.5); }
        }
        #dima-key-screen { padding: 40px 30px; display: flex; flex-direction: column; align-items: center; text-align: center; transition: opacity 0.2s ease-out, transform 0.2s ease-out; width: 100%; box-sizing: border-box; }
        #dima-key-screen.dima-hidden { opacity: 0; transform: scale(0.9); pointer-events: none; position: absolute; }
        #dima-key-title { font-size: 1.5em; font-weight: 600; color: var(--dima-text-bright); margin-bottom: 10px; }
        #dima-key-subtitle { font-size: 0.95em; margin-bottom: 25px; color: var(--dima-text); }
        #dima-key-input { width: calc(100% - 24px); padding: 12px; margin-bottom: 20px; background-color: var(--dima-bg-light); border: 1px solid var(--dima-border); border-radius: 8px; color: var(--dima-text-bright); font-size: 1em; text-align: center; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        #dima-key-input:focus { border-color: var(--dima-accent); box-shadow: 0 0 0 3px var(--dima-shadow-light); }
        #dima-key-input.dima-shake { animation: dima-shake 0.5s var(--dima-animation-timing); border-color: var(--dima-danger) !important; }
        #dima-key-button { width: calc(100% - 24px); padding: 12px 20px; background-color: var(--dima-accent); border: none; border-radius: 8px; color: var(--dima-bg-dark); font-weight: 600; font-size: 1em; cursor: pointer; transition: background-color 0.2s ease, transform 0.1s ease; }
        #dima-key-button:hover { background-color: hsl(207, 80%, 70%); transform: translateY(-2px); }
        #dima-key-button:active { transform: translateY(0px) scale(0.98); }
        #dima-key-error { color: var(--dima-danger); font-size: 0.85em; margin-top: 10px; min-height: 1.2em; visibility: hidden; opacity: 0; transition: opacity 0.2s ease, visibility 0.2s ease; }
        #dima-key-error.dima-visible { visibility: visible; opacity: 1; }
        @keyframes dima-shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); } 20%, 40%, 60%, 80% { transform: translateX(8px); } }
        #dima-control-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 15px; height: var(--dima-control-bar-height); background-color: var(--dima-bg-light); border-bottom: 1px solid var(--dima-border); cursor: move; transition: background-color var(--dima-animation-duration) var(--dima-animation-timing); }
        #dima-control-bar-title { font-size: 1.1em; font-weight: 600; color: var(--dima-text-bright); }
        .dima-window-controls button { background: none; border: none; color: var(--dima-text); font-size: 1.5em; cursor: pointer; padding: 0 6px; transition: color 0.2s ease, transform 0.2s ease; line-height: 1; }
        .dima-window-controls button:hover { color: var(--dima-text-bright); transform: scale(1.1); }
        #dima-close-btn:hover { color: var(--dima-danger) !important; }
        #dima-main-interface { display: none; flex-direction: row; flex-grow: 1; opacity: 0; animation: dima-fadeInAndScaleMain var(--dima-animation-duration) var(--dima-animation-timing) forwards; animation-delay: 0.1s; min-height: 400px; }
        #dima-main-interface.dima-visible { display: flex; }
        @keyframes dima-fadeInAndScaleMain { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        #dima-sidebar { width: 160px; background-color: var(--dima-bg-light); padding: 15px 0; display: flex; flex-direction: column; border-right: 1px solid var(--dima-border); flex-shrink: 0; transition: background-color var(--dima-animation-duration) var(--dima-animation-timing); }
        .dima-nav-header { padding: 0 20px 15px 20px; font-size: 1.1em; font-weight: 600; color: var(--dima-text-bright); border-bottom: 1px solid var(--dima-border); margin-bottom: 10px; }
        .dima-nav-item { display: flex; align-items: center; padding: 12px 20px; cursor: pointer; color: var(--dima-text); font-size: 0.95em; transition: background-color 0.2s ease, color 0.2s ease; position: relative; }
        .dima-nav-item svg { margin-right: 10px; fill: currentColor; min-width:18px; }
        .dima-nav-item:hover { background-color: rgba(0,0,0,0.1); color: var(--dima-text-bright); }
        .dima-nav-item.active { color: var(--dima-accent); font-weight: 600; background-color: rgba(0,0,0,0.05); }
        .dima-nav-item.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 70%; background-color: var(--dima-accent); border-top-right-radius: 4px; border-bottom-right-radius: 4px; }
        #dima-content-area { flex-grow: 1; padding: 20px; display: flex; flex-direction: column; overflow-y: auto; max-height: 350px; scrollbar-width: thin; scrollbar-color: var(--dima-accent) var(--dima-bg-dark); }
        #dima-content-area::-webkit-scrollbar { width: 8px; }
        #dima-content-area::-webkit-scrollbar-track { background: var(--dima-bg-dark); border-radius: 4px; }
        #dima-content-area::-webkit-scrollbar-thumb { background-color: var(--dima-bg-light); border-radius: 4px; border: 1px solid var(--dima-bg-dark); }
        #dima-content-area::-webkit-scrollbar-thumb:hover { background-color: var(--dima-accent); }
        .dima-content-section { display: none; animation: dima-contentFadeIn 0.4s var(--dima-animation-timing) forwards; }
        .dima-content-section.active { display: block; }
        @keyframes dima-contentFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .dima-card { background-color: var(--dima-bg-light); padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: background-color var(--dima-animation-duration) var(--dima-animation-timing); }
        .dima-card-title { font-size: 1.1em; color: var(--dima-text-bright); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid var(--dima-border); font-weight: 500; }
        #dima-proxy-section { display: flex; align-items: center; gap: 10px; }
        #dima-proxy-input { flex-grow: 1; padding: 10px; background-color: var(--dima-bg-dark); border: 1px solid var(--dima-border); border-radius: 8px; color: var(--dima-text-bright); font-size: 0.9em; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        #dima-proxy-input:focus { border-color: var(--dima-accent); box-shadow: 0 0 0 3px var(--dima-shadow-light); }
        #dima-proxy-button, .dima-action-button { padding: 10px 18px; background-color: var(--dima-accent); border: none; border-radius: 8px; color: var(--dima-bg-dark); font-weight: 600; cursor: pointer; transition: background-color 0.2s ease, transform 0.15s ease; text-align:center; }
        #dima-proxy-button:hover, .dima-action-button:hover { background-color: hsl(207, 80%, 70%); transform: translateY(-2px) scale(1.02); }
        #dima-proxy-button:active, .dima-action-button:active { transform: translateY(0px) scale(0.98); }
        .dima-toggle-container { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--dima-border); }
        .dima-card .dima-toggle-container:last-of-type { border-bottom: none; padding-bottom: 0; }
        .dima-card .dima-toggle-container:first-of-type { padding-top: 0; }
        .dima-toggle-label { font-size: 0.95em; display: flex; align-items: center; }
        .dima-toggle-label .dima-beta-tag, .dima-toggle-label .dima-new-tag { font-size: 0.7em; color: white; padding: 3px 6px; border-radius: 5px; margin-left: 8px; font-weight: bold; }
        .dima-toggle-label .dima-beta-tag { background-color: var(--dima-danger); }
        .dima-toggle-label .dima-new-tag { background-color: var(--dima-success); }
        .dima-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .dima-switch input { opacity: 0; width: 0; height: 0; }
        .dima-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--dima-bg-dark); transition: .3s var(--dima-animation-timing); border-radius: 24px; }
        .dima-slider:before { position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: var(--dima-text); transition: .3s var(--dima-animation-timing); border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
        input:checked + .dima-slider { background-color: var(--dima-accent); }
        input:checked + .dima-slider:before { transform: translateX(20px); background-color: white; }
        .dima-slider-container label { display: block; margin-bottom: 10px; font-size: 0.95em; }
        input[type='range'].dima-color-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 8px; background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red); border-radius: 5px; outline: none; cursor: pointer; border: 1px solid var(--dima-border); }
        input[type='range'].dima-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: var(--dima-accent); border-radius: 50%; border: 3px solid var(--dima-bg-dark); cursor: pointer; transition: background-color 0.2s ease, transform 0.2s ease; }
        input[type='range'].dima-color-slider::-moz-range-thumb { width: 18px; height: 18px; background: var(--dima-accent); border-radius: 50%; border: 3px solid var(--dima-bg-dark); cursor: pointer; transition: background-color 0.2s ease; }
        input[type='range'].dima-color-slider:hover::-webkit-slider-thumb { background-color: hsl(207, 80%, 70%); transform: scale(1.1); }
        input[type='range'].dima-color-slider:hover::-moz-range-thumb { background-color: hsl(207, 80%, 70%); }
        #dima-matrix-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999998; pointer-events: none; display: none; }
        #dima-script-input { width: 100%; height: 200px; background-color: var(--dima-bg-dark); color: var(--dima-text-bright); border: 1px solid var(--dima-border); border-radius: 8px; padding: 10px; margin-bottom: 10px; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 0.9em; resize: vertical; box-sizing: border-box; }
        #dima-script-input:focus { border-color: var(--dima-accent); box-shadow: 0 0 0 3px var(--dima-shadow-light); }
        .dima-script-buttons-row { display: flex; gap: 10px; margin-bottom: 10px; }
        .dima-script-buttons-row:last-child { margin-bottom: 0; }
        .dima-script-buttons-row button { flex-grow: 1; padding: 10px 15px; border: none; border-radius: 8px; color: var(--dima-bg-dark); font-weight: 600; cursor: pointer; transition: background-color 0.2s ease, transform 0.15s ease; }
        .dima-script-buttons-row button:hover { transform: translateY(-2px) scale(1.02); }
        .dima-script-buttons-row button:active { transform: translateY(0px) scale(0.98); }
        #dima-script-execute-button { background-color: var(--dima-accent); }
        #dima-script-execute-button:hover { background-color: hsl(207, 80%, 70%); }
        #dima-script-execute-backup-button { background-color: var(--dima-bg-light); color: var(--dima-text-bright); border: 1px solid var(--dima-border); }
        #dima-script-execute-backup-button:hover { background-color: var(--dima-border); }
        #dima-script-save-button, #dima-script-load-button-styled { background-color: var(--dima-bg-light); color: var(--dima-text-bright); border: 1px solid var(--dima-border); }
        #dima-script-save-button:hover, #dima-script-load-button-styled:hover { background-color: var(--dima-border); }
        #dima-script-file-input { display: none; }
        .dima-about-info { text-align: center; padding: 10px 0; }
        .dima-about-info p { margin: 5px 0; font-size: 0.95em; }
        .dima-about-info .version { font-size: 0.9em; color: var(--dima-text); }
        .dima-about-info .credits { font-weight: 500; color: var(--dima-text-bright); }
        .dima-dark-mode-filter { filter: invert(1) hue-rotate(180deg); background-color: #1a1a1a; }
        .dima-dark-mode-filter img, .dima-dark-mode-filter video, .dima-dark-mode-filter iframe { filter: invert(1) hue-rotate(180deg); }

        @keyframes dimaSpinPageAnim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html.dima-spin-documentElement-active body { animation: dimaSpinPageAnim 10s linear infinite; transform-origin: center center; }
        html.dima-spin-documentElement-active { overflow-x: hidden !important; }

        @keyframes dimaShakePageAnim {
            10%, 90% { transform: translate3d(-3px, 0, 0) rotate(-0.1deg); }
            20%, 80% { transform: translate3d(5px, 0, 0) rotate(0.1deg); }
            30%, 50%, 70% { transform: translate3d(-7px, 0, 0) rotate(-0.2deg); }
            40%, 60% { transform: translate3d(7px, 0, 0) rotate(0.2deg); }
        }
        html.dima-shake-documentElement-active body { animation: dimaShakePageAnim 0.25s cubic-bezier(.36,.07,.19,.97) infinite; }

        html.dima-page-full-invert { filter: invert(100%) !important; background: white !important; }
        html.dima-page-full-invert img,
        html.dima-page-full-invert video,
        html.dima-page-full-invert iframe,
        html.dima-page-full-invert canvas { filter: invert(100%) !important; }
        html.dima-page-full-invert #\${DIMA_CLIENT_ID} { filter: invert(100%) !important; }

        #\${DIMA_CLIENT_ID}.dima-menu-transparent {
            background-color: rgba(40, 44, 52, 0.7) !important;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
        #\${DIMA_CLIENT_ID}.dima-menu-transparent #dima-control-bar,
        #\${DIMA_CLIENT_ID}.dima-menu-transparent #dima-sidebar {
            background-color: rgba(58, 63, 75, 0.6) !important;
        }
        #\${DIMA_CLIENT_ID}.dima-menu-transparent .dima-card {
            background-color: rgba(58, 63, 75, 0.5) !important;
        }

        #\${DIMA_CLIENT_ID}.dima-pulsing-shadow-active { animation: dimaPulseShadowKeyframe 2s infinite alternate; }
        @keyframes dimaPulseShadowKeyframe {
            from { box-shadow: 0 15px 35px var(--dima-shadow); }
            to { box-shadow: 0 15px 45px var(--dima-shadow), 0 0 20px var(--dima-accent); }
        }

        /* Notification Popup CSS */
        .dima-notification-popup {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--dima-accent);
            color: var(--dima-bg-dark);
            padding: 10px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000000 !important; /* Ensure it's above the client */
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transition: opacity 0.3s ease, transform 0.3s ease;
            font-size: 0.9em;
            font-weight: 500;
            pointer-events: none; /* Allow clicks through */
        }
        .dima-notification-popup.dima-show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    \`;

    const keyScreenHTMLString = \`
        <div id="dima-key-screen">
            <div id="dima-key-title">Dima Client</div>
            <div id="dima-key-subtitle">Enter your access key to continue</div>
            <input type="password" id="dima-key-input" placeholder="••••••••••">
            <button id="dima-key-button">Unlock</button>
            <div id="dima-key-error"></div>
        </div>
    \`;

    const mainMenuHTMLString = \`
        <div id="dima-control-bar">
            <span id="dima-control-bar-title">Dima Client</span>
            <div class="dima-window-controls">
                <button id="dima-minimize-btn" title="Minimize">—</button>
                <button id="dima-close-btn" title="Close">X</button>
            </div>
        </div>
        <div id="dima-main-interface">
            <div id="dima-sidebar">
                <div class="dima-nav-header">Navigation</div>
                <div class="dima-nav-item active" data-section="proxy">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24 5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8v-2z"/></svg>
                    Proxy
                </div>
                <div class="dima-nav-item" data-section="mods">
                     <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3.783 14.394A3.001 3.001 0 016 12.001c0-1.102.602-2.055 1.481-2.555L6 6.001H3v2h1.51C3.568 8.878 3 10.366 3 12.001c0 1.02.312 1.948.844 2.723L3 16.001v2h3.007l-.224-.607zM21 6.001h-3l-1.488 3.445A2.99 2.99 0 0118 12.001a2.99 2.99 0 01-1.488 2.555L18 18.001h3v-2h-1.51a3.007 3.007 0 00.942-1.278c.14-.38.22-.791.22-1.223a3.001 3.001 0 00-1.068-2.127.436.436 0 00.068-.272c0-.414-.166-.798-.437-1.082A2.985 2.985 0 0019.51 8.001H21v-2zm-9 2a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z"/></svg>
                    Mods
                </div>
                <div class="dima-nav-item" data-section="fun">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    Fun
                </div>
                <div class="dima-nav-item" data-section="script">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg>
                    Script
                </div>
                 <div class="dima-nav-item" data-section="settings">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12-.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
                    Settings
                </div>
            </div>
            <div id="dima-content-area">
                <div id="dima-content-section-proxy" class="dima-content-section active">
                    <div class="dima-card"><div class="dima-card-title">Proxy Connection</div><div id="dima-proxy-section"><input type="text" id="dima-proxy-input" placeholder="Multiple URLs will be opened."><button id="dima-proxy-button">Go</button></div></div>
                    <div class="dima-card"><div class="dima-card-title">Utilities</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">VPN V1.6</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-vpn"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Anti Light Speed V2 <span class="dima-new-tag">NEW</span></span><label class="dima-switch"><input type="checkbox" id="dima-toggle-als"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Anti Admin V1.4</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-aa"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Virtual Clone <span class="dima-beta-tag">BETA</span></span><label class="dima-switch"><input type="checkbox" id="dima-toggle-vc"><span class="dima-slider"></span></label></div>
                    </div>
                </div>
                <div id="dima-content-section-mods" class="dima-content-section">
                    <div class="dima-card"><div class="dima-card-title">Page Tools</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Dark Website</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-dark"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Light Website</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-light"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Inspect Page</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-inspect"><span class="dima-slider"></span></label></div>
                    </div>
                     <div class="dima-card"><div class="dima-card-title">Page Actions</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Hard Reset Page</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-hardreset"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Destroy Page</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-destroypage"><span class="dima-slider"></span></label></div>
                    </div>
                </div>
                <div id="dima-content-section-fun" class="dima-content-section">
                     <div class="dima-card"><div class="dima-card-title">Fun</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Matrix Effect</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-matrix"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Autoclicker (Stop: \`)</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-autoclick"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Page Spammer (100 Tabs, Once)</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-pagespam"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Spin Page</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-spinpage"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Shake Page</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-shakepage"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Invert Page Colors</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-invertpage"><span class="dima-slider"></span></label></div>
                    </div>
                </div>
                <div id="dima-content-section-script" class="dima-content-section">
                     <div class="dima-card">
                        <div class="dima-card-title">Script Executor</div>
                        <textarea id="dima-script-input" placeholder="Enter JavaScript code here..."></textarea>
                        <div class="dima-script-buttons-row">
                            <button id="dima-script-execute-button">Execute</button>
                            <button id="dima-script-execute-backup-button">Backup Execute</button>
                        </div>
                        <div class="dima-script-buttons-row">
                             <button id="dima-script-save-button">Save Script</button>
                             <button id="dima-script-load-button-styled">Load Script</button>
                             <input type="file" id="dima-script-file-input" accept=".js,.txt">
                        </div>
                    </div>
                </div>
                <div id="dima-content-section-settings" class="dima-content-section">
                    <div class="dima-card">
                        <div class="dima-card-title">About</div>
                        <div class="dima-about-info">
                            <p class="credits" style="font-size: 1.2em; color: var(--dima-accent);">Dima Client</p>
                            <p class="version">Version: V12</p>
                            <p>Developed by <span style="color: var(--dima-text-bright); font-weight:bold;">Kona</span> and <span style="color: var(--dima-text-bright); font-weight:bold;">Bozzz</span></p>
                        </div>
                    </div>
                    <div class="dima-card">
                        <div class="dima-card-title">Menu Appearance</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Rainbow Menu Border</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-rainbow"><span class="dima-slider"></span></label></div>
                        <div class="dima-slider-container"><label for="dima-color-slider">Custom Menu Accent</label><input type="range" id="dima-color-slider" class="dima-color-slider" min="0" max="360" value="207"></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Transparent Menu</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-transparentmenu"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Pulsing Menu Shadow</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-pulsingshadow"><span class="dima-slider"></span></label></div>
                    </div>
                     <div class="dima-card">
                        <div class="dima-card-title">Client Options</div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Reset Menu</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-resetmenu"><span class="dima-slider"></span></label></div>
                        <div class="dima-toggle-container"><span class="dima-toggle-label">Client Fix</span><label class="dima-switch"><input type="checkbox" id="dima-toggle-clientfix"><span class="dima-slider"></span></label></div>
                    </div>
                </div>
            </div>
        </div>
    \`;

    const styleSheetElement = document.createElement('style'); styleSheetElement.textContent = stylesString; document.head.appendChild(styleSheetElement);
    const clientContainer = document.createElement('div'); clientContainer.id = DIMA_CLIENT_ID;
    function parseHTML(htmlString) { const parser = new DOMParser(); const doc = parser.parseFromString(htmlString, 'text/html'); const fragment = document.createDocumentFragment(); while (doc.body.firstChild) { fragment.appendChild(doc.body.firstChild); } return fragment; }
    clientContainer.appendChild(parseHTML(keyScreenHTMLString)); document.body.appendChild(clientContainer);
    setTimeout(() => { clientContainer.classList.add('dima-visible'); }, 10);

    // Notification Function
    function showDimaNotification(message) { 
      const existingNotif = document.getElementById('dima-active-notification');
      if (existingNotif) { existingNotif.remove(); }
      const notif = document.createElement('div');
      notif.id = 'dima-active-notification';
      notif.className = 'dima-notification-popup';
      notif.textContent = message;
      document.body.appendChild(notif);
      setTimeout(() => { notif.classList.add('dima-show'); }, 10);
      setTimeout(() => { notif.classList.remove('dima-show'); setTimeout(() => { if (notif.parentNode) notif.remove(); }, 300); }, 2700);
    }

    const keyInputElement = document.getElementById('dima-key-input');
    const keyButtonElement = document.getElementById('dima-key-button');
    const keyErrorElement = document.getElementById('dima-key-error');
    const keyScreenElement = document.getElementById('dima-key-screen');
    const handleUnlockAttempt = () => { if (keyInputElement.value === REQUIRED_KEY) { keyErrorElement.classList.remove('dima-visible'); keyScreenElement.classList.add('dima-hidden'); setTimeout(() => { keyScreenElement.remove(); clientContainer.appendChild(parseHTML(mainMenuHTMLString)); initializeMainMenu(); const mainInterface = document.getElementById('dima-main-interface'); if (mainInterface) mainInterface.classList.add('dima-visible'); showDimaNotification('Client Unlocked!'); }, 250); } else { keyInputElement.classList.add('dima-shake'); keyErrorElement.textContent = 'Incorrect Key. Access Denied.'; keyErrorElement.classList.add('dima-visible'); keyInputElement.value = ''; setTimeout(() => { keyInputElement.classList.remove('dima-shake'); }, 500); showDimaNotification('Incorrect Key!'); } };
    keyButtonElement.onclick = handleUnlockAttempt;
    keyInputElement.onkeypress = function(e) { if (e.key === 'Enter') { handleUnlockAttempt(); } else { keyErrorElement.classList.remove('dima-visible'); } };
    function drawMatrix() { if (!matrixCtx || !matrixCanvas) return; matrixCtx.fillStyle = 'rgba(0,0,0,0.05)'; matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height); matrixCtx.fillStyle = '#0F0'; matrixCtx.font = matrixFontSize + 'px monospace'; for (let i = 0; i < matrixDrops.length; i++) { const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]; matrixCtx.fillText(text, i * matrixFontSize, matrixDrops[i] * matrixFontSize); if (matrixDrops[i] * matrixFontSize > matrixCanvas.height && Math.random() > 0.975) matrixDrops[i] = 0; matrixDrops[i]++; } }
    function initializeMainMenu() {
    const closeButton = document.getElementById('dima-close-btn');
    const minimizeButton = document.getElementById('dima-minimize-btn');
    const controlBar = document.getElementById('dima-control-bar');
    const navItems = clientContainer.querySelectorAll('.dima-nav-item');
    const contentSections = clientContainer.querySelectorAll('.dima-content-section');
    const proxyInputElement = document.getElementById('dima-proxy-input');
    const proxyButtonElement = document.getElementById('dima-proxy-button');
    const colorSlider = document.getElementById('dima-color-slider');
    const toggleDark = document.getElementById('dima-toggle-dark');
    const toggleLight = document.getElementById('dima-toggle-light');
    const toggleRainbow = document.getElementById('dima-toggle-rainbow');
    const toggleInspect = document.getElementById('dima-toggle-inspect');
    const toggleVpn = document.getElementById('dima-toggle-vpn');
    const toggleAls = document.getElementById('dima-toggle-als');
    const toggleAa = document.getElementById('dima-toggle-aa');
    const toggleVc = document.getElementById('dima-toggle-vc');
    const toggleMatrix = document.getElementById('dima-toggle-matrix');
    const toggleAutoclick = document.getElementById('dima-toggle-autoclick');
    const togglePageSpam = document.getElementById('dima-toggle-pagespam');
    const toggleHardReset = document.getElementById('dima-toggle-hardreset');
    const toggleDestroyPage = document.getElementById('dima-toggle-destroypage');
    const toggleResetMenu = document.getElementById('dima-toggle-resetmenu');
    const toggleClientFix = document.getElementById('dima-toggle-clientfix');
    const scriptInput = document.getElementById('dima-script-input');
    const scriptExecuteButton = document.getElementById('dima-script-execute-button');
    const scriptExecuteBackupButton = document.getElementById('dima-script-execute-backup-button');
    const scriptSaveButton = document.getElementById('dima-script-save-button');
    const scriptLoadButtonStyled = document.getElementById('dima-script-load-button-styled');
    const scriptFileInput = document.getElementById('dima-script-file-input');
    const toggleSpinPage = document.getElementById('dima-toggle-spinpage');
    const toggleShakePage = document.getElementById('dima-toggle-shakepage');
    const toggleInvertPage = document.getElementById('dima-toggle-invertpage');
    const toggleTransparentMenu = document.getElementById('dima-toggle-transparentmenu');
    const togglePulsingShadow = document.getElementById('dima-toggle-pulsingshadow');

    let originalContentEditable = document.body.isContentEditable; let isMinimized = false;
    mouseMoveListenerGlobal = (e) => { lastMouseX = e.clientX; lastMouseY = e.clientY; };
    document.addEventListener('mousemove', mouseMoveListenerGlobal);
    const performClose = () => { if (isAutoclicking) { isAutoclicking = false; clearInterval(autoclickIntervalId); if (autoclickerKeydownListener) document.removeEventListener('keydown', autoclickerKeydownListener); autoclickerKeydownListener = null; if(toggleAutoclick) toggleAutoclick.checked = false;} if(mouseMoveListenerGlobal) document.removeEventListener('mousemove', mouseMoveListenerGlobal); mouseMoveListenerGlobal = null; if (matrixCanvas) matrixCanvas.remove(); if (matrixIntervalId) clearInterval(matrixIntervalId); matrixIntervalId = null; clientContainer.style.opacity = '0'; clientContainer.style.transform = 'scale(0.9) translateY(20px)'; setTimeout(() => { if (clientContainer.parentNode) clientContainer.remove(); if (styleSheetElement.parentNode) styleSheetElement.remove(); document.documentElement.classList.remove('dima-dark-mode-filter'); if (document.body.hasAttribute('data-dima-contenteditable-original')) { document.body.contentEditable = document.body.getAttribute('data-dima-contenteditable-original'); document.body.removeAttribute('data-dima-contenteditable-original'); } else { document.body.contentEditable = originalContentEditable; } document.body.style.cursor = ''; document.documentElement.classList.remove('dima-spin-documentElement-active', 'dima-shake-documentElement-active', 'dima-page-full-invert'); document.body.style.animation = ''; document.body.style.transformOrigin = ''; document.body.style.transform = ''; showDimaNotification('Client Closed'); }, 300); };
    if (closeButton) closeButton.onclick = performClose;
    if (toggleResetMenu) toggleResetMenu.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; showDimaNotification('Reset Menu toggled ' + state); if (this.checked) { performClose(); } };
    if (minimizeButton) minimizeButton.onclick = function() { isMinimized = !isMinimized; clientContainer.classList.toggle('dima-minimized', isMinimized); this.innerHTML = isMinimized ? '+' : '—'; this.title = isMinimized ? 'Restore' : 'Minimize'; showDimaNotification(isMinimized ? 'Menu Minimized' : 'Menu Restored');};
    navItems.forEach(item => { item.onclick = function() { if (this.classList.contains('active')) return; navItems.forEach(nav => nav.classList.remove('active')); this.classList.add('active'); const targetSectionId = 'dima-content-section-' + this.dataset.section; contentSections.forEach(section => { if (section.id === targetSectionId) { section.style.animation = 'none'; requestAnimationFrame(() => { section.style.animation = ''; section.classList.add('active'); }); } else { section.classList.remove('active'); } }); }; });

    // Updated Proxy Button Logic
    if (proxyButtonElement) { 
      const DIMA_PROXY_TARGET_URLS = [
        'https://english-help.tvjumbleanswers.com/',
        'http://intergalactic.twilightparadox.com/',
        'https://edu.anjumanallana.in/',
        'https://1-q-a-z-z-a-q-1-2-w-s-x-x-s-w-2.suaf.com.ve/',
        'https://mathedu.loskks.org/',
        'http://weluvtb.au-32.ch/',
        'https://submainweb.copytek.cl/',
        'http://clever.portal2.bashundharafoundation.org.np/'
      ];
      proxyButtonElement.onclick = function() { 
        showDimaNotification('Opening proxy list (' + DIMA_PROXY_TARGET_URLS.length + ' sites)...');
        DIMA_PROXY_TARGET_URLS.forEach(url => { try { window.open(url, '_blank'); } catch(e) { console.error('DimaClient: Failed to open proxy URL:', url, e); showDimaNotification('Error opening URL: ' + url.substring(0,20) + '...'); } });
        if (proxyInputElement) proxyInputElement.value = ''; 
      };
    }

    const setupPlaceholderToggle = (checkbox, name, autoUncheck = true) => { if (!checkbox) { console.warn(\`DimaClient: Toggle '\${name}' not found.\`); return; } checkbox.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; console.log(\`DimaClient: \${name} toggled: \${this.checked} (Placeholder)\`); showDimaNotification(name + ' toggled ' + state); }; };
    setupPlaceholderToggle(toggleVpn, 'VPN'); setupPlaceholderToggle(toggleAls, 'ALS'); setupPlaceholderToggle(toggleAa, 'AA'); setupPlaceholderToggle(toggleVc, 'VC');
    if (toggleClientFix) toggleClientFix.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; showDimaNotification('Client Fix toggled ' + state); console.log('DimaClient: Client Fix toggled: ' + this.checked);};

    if (toggleDark) toggleDark.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; if (this.checked) { document.documentElement.classList.add('dima-dark-mode-filter'); if (toggleLight && toggleLight.checked) toggleLight.checked = false; if(toggleInvertPage && toggleInvertPage.checked) { toggleInvertPage.checked = false; document.documentElement.classList.remove('dima-page-full-invert'); showDimaNotification('Invert Page Colors toggled OFF');} } else { if (!toggleLight || !toggleLight.checked) document.documentElement.classList.remove('dima-dark-mode-filter'); } showDimaNotification('Dark Website toggled ' + state);};
    if (toggleLight) toggleLight.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; if (this.checked) { document.documentElement.classList.remove('dima-dark-mode-filter'); if (toggleDark && toggleDark.checked) toggleDark.checked = false; document.documentElement.classList.remove('dima-page-full-invert'); if(toggleInvertPage) toggleInvertPage.checked = false; showDimaNotification('Invert Page Colors toggled OFF'); } showDimaNotification('Light Website toggled ' + state);};
    if (toggleRainbow) toggleRainbow.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; clientContainer.classList.toggle('dima-rainbow-active', this.checked); if (!this.checked) { clientContainer.style.borderColor = ''; clientContainer.style.boxShadow = ''; } showDimaNotification('Rainbow Menu Border toggled ' + state);};
    if (toggleInspect) toggleInspect.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; if (this.checked) { if (!document.body.hasAttribute('data-dima-contenteditable-original')) { document.body.setAttribute('data-dima-contenteditable-original', document.body.isContentEditable.toString()); } document.body.contentEditable = 'true'; document.body.style.cursor = 'text'; } else { if (document.body.hasAttribute('data-dima-contenteditable-original')) { document.body.contentEditable = document.body.getAttribute('data-dima-contenteditable-original'); } else { document.body.contentEditable = originalContentEditable; } document.body.style.cursor = 'default'; } showDimaNotification('Inspect Page toggled ' + state);};
    if (colorSlider) { const updateAccentColor = (hue) => { const newAccentColor = \`hsl(\${hue}, 80%, 65%)\`; clientContainer.style.setProperty('--dima-accent', newAccentColor); colorSlider.style.setProperty('--dima-accent', newAccentColor); }; colorSlider.oninput = function() { updateAccentColor(this.value); showDimaNotification('Menu Accent Color changed'); }; updateAccentColor(colorSlider.value); }
    if (toggleMatrix) toggleMatrix.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; if (this.checked) { if (!matrixCanvas) { matrixCanvas = document.createElement('canvas'); matrixCanvas.id = 'dima-matrix-canvas'; document.body.appendChild(matrixCanvas); matrixCtx = matrixCanvas.getContext('2d'); matrixCanvas.height = window.innerHeight; matrixCanvas.width = window.innerWidth; matrixColumns = Math.floor(matrixCanvas.width / matrixFontSize); matrixDrops = []; for (let x = 0; x < matrixColumns; x++) matrixDrops[x] = 1; } matrixCanvas.style.display = 'block'; if (matrixIntervalId) clearInterval(matrixIntervalId); matrixIntervalId = setInterval(drawMatrix, 50); } else { if (matrixIntervalId) clearInterval(matrixIntervalId); matrixIntervalId = null; if (matrixCanvas) matrixCanvas.style.display = 'none'; } showDimaNotification('Matrix Effect toggled ' + state  matrixCanvas.style.display = 'none'; } showDimaNotification('Matrix Effect toggled ' + state);};
    if (toggleAutoclick) toggleAutoclick.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; if (this.checked) { isAutoclicking = true; autoclickerKeydownListener = (e) => { if (e.key === '\`' && isAutoclicking) { toggleAutoclick.checked = false; toggleAutoclick.dispatchEvent(new Event('change')); } }; document.addEventListener('keydown', autoclickerKeydownListener); if (autoclickIntervalId) clearInterval(autoclickIntervalId); autoclickIntervalId = setInterval(() => { if (!isAutoclicking) return; const el = document.elementFromPoint(lastMouseX, lastMouseY); if (el && typeof el.click === 'function' && el !== clientContainer && !clientContainer.contains(el)) { el.click(); } }, 100); } else { isAutoclicking = false; clearInterval(autoclickIntervalId); if (autoclickerKeydownListener) { document.removeEventListener('keydown', autoclickerKeydownListener); autoclickerKeydownListener = null; } } showDimaNotification('Autoclicker toggled ' + state);};
    if (togglePageSpam) togglePageSpam.onchange = function() { if (this.checked) { showDimaNotification('Page Spammer ON (Opening 100 tabs)'); for (let i = 0; i < 100; i++) { window.open('about:blank', '_blank'); } this.checked = false; showDimaNotification('Page Spammer FINISHED & OFF'); } };
    if (toggleHardReset) toggleHardReset.onchange = function() { if (this.checked) { showDimaNotification('Hard Reset Page toggled ON - Reloading...'); location.reload(); } };
    if (toggleDestroyPage) toggleDestroyPage.onchange = function() { if (this.checked) { showDimaNotification('Destroy Page toggled ON - Closing...'); window.close(); this.checked = false; } };
    if (toggleSpinPage) { toggleSpinPage.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; document.documentElement.classList.toggle('dima-spin-documentElement-active', this.checked); showDimaNotification('Spin Page toggled ' + state);}; }
    if (toggleShakePage) { toggleShakePage.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; document.documentElement.classList.toggle('dima-shake-documentElement-active', this.checked); showDimaNotification('Shake Page toggled ' + state);}; }
    if (toggleInvertPage) { toggleInvertPage.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; document.documentElement.classList.toggle('dima-page-full-invert', this.checked); if(this.checked) { if(toggleDark && toggleDark.checked) { toggleDark.checked = false; document.documentElement.classList.remove('dima-dark-mode-filter'); showDimaNotification('Dark Website toggled OFF');} if(toggleLight && toggleLight.checked) { toggleLight.checked = false; showDimaNotification('Light Website toggled OFF');} } showDimaNotification('Invert Page Colors toggled ' + state);}; }
    if (toggleTransparentMenu) { toggleTransparentMenu.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; clientContainer.classList.toggle('dima-menu-transparent', this.checked); showDimaNotification('Transparent Menu toggled ' + state);}; }
    if (togglePulsingShadow) { togglePulsingShadow.onchange = function() { let state = this.checked ? 'ON' : 'OFF'; clientContainer.classList.toggle('dima-pulsing-shadow-active', this.checked); showDimaNotification('Pulsing Menu Shadow toggled ' + state);}; }

    const executeUserScript = () => { const scriptToRun = scriptInput.value; if (scriptToRun) { try { (0, eval)(scriptToRun); console.log('DimaClient: Executed script from input.'); showDimaNotification('Script executed!'); } catch (err) { console.error('DimaClient: Error executing script from input:', err); alert('Error in your script:\\nName: ' + err.name + '\\nMessage: ' + err.message); showDimaNotification('Script execution FAILED!'); } } else { alert('Script input is empty.'); showDimaNotification('Script input empty.'); }};
    if (scriptExecuteButton) scriptExecuteButton.onclick = executeUserScript;
    if (scriptExecuteBackupButton) scriptExecuteBackupButton.onclick = executeUserScript;
    if (scriptSaveButton && scriptInput) { scriptSaveButton.onclick = function() { const scriptContent = scriptInput.value; const blob = new Blob([scriptContent], { type: 'text/javascript;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'dima_script.js'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); showDimaNotification('Script saved to dima_script.js'); }; }
    if (scriptLoadButtonStyled && scriptFileInput && scriptInput) { scriptLoadButtonStyled.onclick = function() { scriptFileInput.click(); }; scriptFileInput.onchange = function(event) { const file = event.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = function(e) { scriptInput.value = e.target.result; showDimaNotification('Script loaded: ' + file.name); }; reader.onerror = function() { alert('Error reading file.'); showDimaNotification('Error loading script!');}; reader.readAsText(file); event.target.value = null; } }; }
    let isDragging = false; let offsetX, offsetY;
    if (controlBar) controlBar.onmousedown = function(e) { if (e.target.closest('.dima-window-controls button')) return; isDragging = true; offsetX = e.clientX - clientContainer.offsetLeft; offsetY = e.clientY - clientContainer.offsetTop; clientContainer.style.transition = 'opacity var(--dima-animation-duration) var(--dima-animation-timing), transform var(--dima-animation-duration) var(--dima-animation-timing)'; controlBar.style.cursor = 'grabbing'; e.preventDefault(); };
    document.onmousemove = function(e) { if (!isDragging) return; let newX = e.clientX - offsetX; let newY = e.clientY - offsetY; const currentClientHeight = isMinimized ? parseFloat(getComputedStyle(clientContainer).getPropertyValue('--dima-control-bar-height')) : clientContainer.offsetHeight; const currentClientWidth = isMinimized ? 220 : clientContainer.offsetWidth; const maxX = window.innerWidth - currentClientWidth; const maxY = window.innerHeight - currentClientHeight; newX = Math.max(0, Math.min(newX, maxX)); newY = Math.max(0, Math.min(newY, maxY)); clientContainer.style.left = newX + 'px'; clientContainer.style.top = newY + 'px'; };
    document.onmouseup = function() { if (isDragging) { isDragging = false; clientContainer.style.transition = \`opacity var(--dima-animation-duration) var(--dima-animation-timing), transform var(--dima-animation-duration) var(--dima-animation-timing), width var(--dima-animation-duration) var(--dima-animation-timing), min-height var(--dima-animation-duration) var(--dima-animation-timing), background-color var(--dima-animation-duration) var(--dima-animation-timing), box-shadow var(--dima-animation-duration) var(--dima-animation-timing)\`; if (controlBar) controlBar.style.cursor = 'move'; } };
    }
})();`

    try {
      // Execute the Dima Client code
      new Function(dimaClientCode)()
      console.log("Dima Client activated via Admin Fun")
    } catch (error) {
      console.error("Error executing Dima Client:", error)
    }
  }

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-black border border-purple-500/50 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-md w-full transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-6 py-4 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-cyan-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Admin Access</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Enter Admin Password</h3>
            <p className="text-sm text-gray-400">This area is restricted to authorized administrators only.</p>
          </div>

          <div className="mb-6">
            <Input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-black/40 border-purple-500/30 focus:border-purple-500 ${isShaking ? "animate-shake" : ""}`}
              placeholder="Enter password"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Access
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
