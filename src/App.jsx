import { useState, useEffect, useCallback } from "react";

// ─── Animated Exercise Visualizations ───
// Each returns an SVG with CSS keyframe animation showing proper form

const ExVis = ({ name, playing }) => {
  const key = name.toLowerCase().replace(/[^a-z ]/g, "");
  const Comp = VIS_MAP[Object.keys(VIS_MAP).find(k => key.includes(k))] || GenericVis;
  return <Comp playing={playing} />;
};

function GenericVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes genBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .gen-body { animation: ${playing ? "genBob 1.5s ease-in-out infinite" : "none"}; }
      `}</style>
      <g className="gen-body">
        <circle cx="60" cy="28" r="10" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="38" x2="60" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="48" x2="40" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="48" x2="80" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="70" x2="45" y2="95" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="70" x2="75" y2="95" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="60" y="114" textAnchor="middle" fontSize="8" fill="#94a3b8">Exercise</text>
    </svg>
  );
}

function PushupVis({ playing }) {
  return (
    <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes pushup { 
          0%,100%{ transform: rotate(0deg); } 
          50%{ transform: rotate(-8deg); } 
        }
        @keyframes pushupArm { 
          0%,100%{ transform: rotate(0deg); } 
          50%{ transform: rotate(15deg); } 
        }
        .pu-body { transform-origin: 130px 75px; animation: ${playing ? "pushup 1.8s ease-in-out infinite" : "none"}; }
        .pu-arm { transform-origin: 55px 55px; animation: ${playing ? "pushupArm 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="80" x2="140" y2="80" stroke="#e2e8f0" strokeWidth="2" />
      <g className="pu-body">
        <circle cx="40" cy="48" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="48" y1="50" x2="115" y2="60" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="115" y1="60" x2="130" y2="75" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="pu-arm">
        <line x1="55" y1="55" x2="55" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="58" x2="75" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="55" cy="80" r="2" fill="#334155" />
      <circle cx="75" cy="80" r="2" fill="#334155" />
    </svg>
  );
}

function SquatVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes squat {
          0%,100%{ transform: translateY(0); }
          50%{ transform: translateY(18px); }
        }
        @keyframes sqKnee {
          0%,100%{ d: path("M60,70 L50,90 L50,105"); }
          50%{ d: path("M60,70 L45,82 L42,100"); }
        }
        .sq-upper { animation: ${playing ? "squat 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="sq-upper">
        <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="31" x2="60" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="44" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="76" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="62" x2="48" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="82" x2="46" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="62" x2="72" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="82" x2="74" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PlankVis({ playing }) {
  return (
    <svg viewBox="0 0 160 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes plankShake { 
          0%,100%{transform:translateY(0)} 25%{transform:translateY(-1px)} 75%{transform:translateY(1px)} 
        }
        .plk { animation: ${playing ? "plankShake 0.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="15" y1="72" x2="145" y2="72" stroke="#e2e8f0" strokeWidth="2" />
      <g className="plk">
        <circle cx="35" cy="42" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="43" y1="44" x2="120" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="50" x2="128" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="46" x2="48" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="47" x2="58" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="80" y="85" textAnchor="middle" fontSize="7" fill="#16a34a" fontWeight="600">{playing ? "Hold steady!" : "Plank"}</text>
    </svg>
  );
}

function LungeVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes lungeDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)} }
        .lu { animation: ${playing ? "lungeDown 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="15" y1="108" x2="105" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="lu">
        <circle cx="55" cy="18" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="55" y1="26" x2="55" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="36" x2="40" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="36" x2="70" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="58" x2="38" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="78" x2="35" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="58" x2="75" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="78" x2="82" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RowVis({ playing }) {
  return (
    <svg viewBox="0 0 140 110" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes rowPull { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-20deg)} }
        .row-arm { transform-origin: 70px 48px; animation: ${playing ? "rowPull 1.6s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="20" y="58" width="30" height="20" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="15" y1="80" x2="125" y2="80" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="80" cy="30" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="80" y1="38" x2="70" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="62" x2="60" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="62" x2="85" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="row-arm">
        <line x1="75" y1="48" x2="55" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="48" y="55" width="8" height="4" rx="2" fill="#64748b" />
      </g>
    </svg>
  );
}

function CurlVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes curl { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-110deg)} }
        .curl-fore { transform-origin: 72px 60px; animation: ${playing ? "curl 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="31" x2="60" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="45" x2="45" y2="60" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="45" x2="72" y2="60" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="curl-fore">
        <line x1="72" y1="60" x2="72" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="68" y="80" width="8" height="5" rx="2" fill="#64748b" />
      </g>
      <line x1="60" y1="65" x2="48" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="90" x2="46" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="65" x2="72" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="90" x2="74" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ShoulderPressVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes press { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        .press-arm { animation: ${playing ? "press 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="28" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="37" x2="60" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="press-arm">
        <line x1="60" y1="47" x2="40" y2="38" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="38" x2="36" y2="22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="32" y="18" width="8" height="5" rx="2" fill="#64748b" />
        <line x1="60" y1="47" x2="80" y2="38" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="38" x2="84" y2="22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="80" y="18" width="8" height="5" rx="2" fill="#64748b" />
      </g>
      <line x1="60" y1="68" x2="48" y2="92" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="92" x2="46" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="68" x2="72" y2="92" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="92" x2="74" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FloorPressVis({ playing }) {
  return (
    <svg viewBox="0 0 160 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes fpress { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .fp-arm { animation: ${playing ? "fpress 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="72" x2="150" y2="72" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="30" cy="58" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="38" y1="60" x2="90" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="68" x2="110" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="110" y1="70" x2="125" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="fp-arm">
        <line x1="55" y1="64" x2="55" y2="45" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="50" y="40" width="10" height="5" rx="2" fill="#64748b" />
        <line x1="70" y1="66" x2="70" y2="47" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="65" y="42" width="10" height="5" rx="2" fill="#64748b" />
      </g>
    </svg>
  );
}

function DeadHangVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes hangSway { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        .hang-body { transform-origin: 60px 18px; animation: ${playing ? "hangSway 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="30" y="10" width="60" height="6" rx="3" fill="#94a3b8" />
      <g className="hang-body">
        <line x1="45" y1="16" x2="45" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="16" x2="75" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="38" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="47" x2="60" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="52" x2="45" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="52" x2="75" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="78" x2="50" y2="100" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="78" x2="70" y2="100" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function GluteBridgeVis({ playing }) {
  return (
    <svg viewBox="0 0 160 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes bridge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .br-hip { animation: ${playing ? "bridge 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="75" x2="150" y2="75" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="28" cy="60" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="36" y1="62" x2="70" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="br-hip">
        <line x1="70" y1="55" x2="80" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="40" x2="100" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <line x1="100" y1="55" x2="105" y2="73" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="55" x2="115" y2="73" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CalfRaiseVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes calfUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .calf-b { animation: ${playing ? "calfUp 1.4s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="calf-b">
        <circle cx="60" cy="20" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="29" x2="60" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="40" x2="45" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="40" x2="75" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="62" x2="52" y2="88" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="88" x2="50" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="62" x2="68" y2="88" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="88" x2="70" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CrunchVis({ playing }) {
  return (
    <svg viewBox="0 0 160 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes crunch { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(25deg)} }
        .cr-torso { transform-origin: 70px 60px; animation: ${playing ? "crunch 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="75" x2="150" y2="75" stroke="#e2e8f0" strokeWidth="2" />
      <g className="cr-torso">
        <circle cx="40" cy="52" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="48" y1="55" x2="80" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="54" x2="42" y2="42" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="58" y1="56" x2="50" y2="44" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <line x1="80" y1="68" x2="95" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="95" y1="50" x2="100" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="68" x2="105" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="105" y1="55" x2="115" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function LegRaiseVis({ playing }) {
  return (
    <svg viewBox="0 0 160 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes legRaise { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-50deg)} }
        .lr-legs { transform-origin: 85px 62px; animation: ${playing ? "legRaise 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="75" x2="150" y2="75" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="30" cy="56" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="38" y1="58" x2="85" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="55" x2="35" y2="42" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="57" x2="45" y2="44" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="lr-legs">
        <line x1="85" y1="62" x2="115" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="62" x2="120" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function JumpingJacksVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes jjArms { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-45deg)} }
        @keyframes jjLegs { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(15deg)} }
        @keyframes jjBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .jj-larm { transform-origin: 60px 42px; animation: ${playing ? "jjArms 0.7s ease-in-out infinite" : "none"}; }
        .jj-rarm { transform-origin: 60px 42px; animation: ${playing ? "jjArms 0.7s ease-in-out infinite reverse" : "none"}; }
        .jj-lleg { transform-origin: 60px 68px; animation: ${playing ? "jjLegs 0.7s ease-in-out infinite" : "none"}; }
        .jj-rleg { transform-origin: 60px 68px; animation: ${playing ? "jjLegs 0.7s ease-in-out infinite reverse" : "none"}; }
        .jj-body { animation: ${playing ? "jjBounce 0.7s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="jj-body">
        <circle cx="60" cy="24" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="33" x2="60" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <g className="jj-larm"><line x1="60" y1="42" x2="40" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
        <g className="jj-rarm"><line x1="60" y1="42" x2="80" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
        <g className="jj-lleg"><line x1="60" y1="68" x2="46" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
        <g className="jj-rleg"><line x1="60" y1="68" x2="74" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
      </g>
    </svg>
  );
}

function HighKneesVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes hkLeft { 0%,50%{transform:rotate(0deg)} 25%{transform:rotate(-40deg)} }
        @keyframes hkRight { 0%,50%{transform:rotate(0deg)} 75%{transform:rotate(-40deg)} }
        @keyframes hkBob { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-4px)} 75%{transform:translateY(-4px)} }
        .hk-ll { transform-origin: 55px 68px; animation: ${playing ? "hkLeft 1s ease-in-out infinite" : "none"}; }
        .hk-rl { transform-origin: 65px 68px; animation: ${playing ? "hkRight 1s ease-in-out infinite" : "none"}; }
        .hk-body { animation: ${playing ? "hkBob 1s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="hk-body">
        <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="31" x2="60" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="42" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="78" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <g className="hk-ll">
          <line x1="55" y1="68" x2="45" y2="88" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="88" x2="43" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className="hk-rl">
          <line x1="65" y1="68" x2="75" y2="88" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="75" y1="88" x2="77" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function WallPushupVis({ playing }) {
  return (
    <svg viewBox="0 0 140 110" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes wallpu { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(6deg)} }
        .wpu { transform-origin: 55px 100px; animation: ${playing ? "wallpu 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="10" y="5" width="8" height="100" rx="2" fill="#cbd5e1" />
      <line x1="10" y1="105" x2="130" y2="105" stroke="#e2e8f0" strokeWidth="2" />
      <g className="wpu">
        <circle cx="55" cy="28" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="55" y1="36" x2="55" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="46" x2="22" y2="38" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="46" x2="22" y2="44" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="38" r="2" fill="#334155" />
        <circle cx="22" cy="44" r="2" fill="#334155" />
        <line x1="55" y1="68" x2="48" y2="100" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="68" x2="62" y2="100" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ChairSitStandVis({ playing }) {
  return (
    <svg viewBox="0 0 130 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes sitstand { 0%,100%{transform:translateY(14px)} 50%{transform:translateY(0)} }
        .ss-b { animation: ${playing ? "sitstand 2.2s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="70" y="55" width="35" height="5" rx="2" fill="#94a3b8" />
      <line x1="72" y1="60" x2="72" y2="108" stroke="#94a3b8" strokeWidth="2.5" />
      <line x1="103" y1="60" x2="103" y2="108" stroke="#94a3b8" strokeWidth="2.5" />
      <rect x="98" y="40" width="8" height="20" rx="2" fill="#94a3b8" />
      <line x1="20" y1="108" x2="115" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="ss-b">
        <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="31" x2="60" y2="60" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="45" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="75" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="60" x2="48" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="82" x2="45" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="60" x2="72" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="82" x2="75" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function WalkVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes walkL { 0%,100%{transform:rotate(-15deg)} 50%{transform:rotate(15deg)} }
        @keyframes walkR { 0%,100%{transform:rotate(15deg)} 50%{transform:rotate(-15deg)} }
        @keyframes walkAL { 0%,100%{transform:rotate(10deg)} 50%{transform:rotate(-10deg)} }
        @keyframes walkAR { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} }
        .wk-ll { transform-origin: 58px 65px; animation: ${playing ? "walkL 1s ease-in-out infinite" : "none"}; }
        .wk-rl { transform-origin: 62px 65px; animation: ${playing ? "walkR 1s ease-in-out infinite" : "none"}; }
        .wk-la { transform-origin: 58px 42px; animation: ${playing ? "walkAL 1s ease-in-out infinite" : "none"}; }
        .wk-ra { transform-origin: 62px 42px; animation: ${playing ? "walkAR 1s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="31" x2="60" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="wk-la"><line x1="58" y1="42" x2="42" y2="56" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="wk-ra"><line x1="62" y1="42" x2="78" y2="56" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="wk-ll"><line x1="58" y1="65" x2="46" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="wk-rl"><line x1="62" y1="65" x2="74" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" /></g>
    </svg>
  );
}

function SeatedArmRaiseVis({ playing }) {
  return (
    <svg viewBox="0 0 130 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes armRaise { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-60deg)} }
        .ar-arms { transform-origin: 60px 48px; animation: ${playing ? "armRaise 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="40" y="62" width="40" height="5" rx="2" fill="#94a3b8" />
      <line x1="42" y1="67" x2="42" y2="108" stroke="#94a3b8" strokeWidth="2" />
      <line x1="78" y1="67" x2="78" y2="108" stroke="#94a3b8" strokeWidth="2" />
      <line x1="20" y1="108" x2="110" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="30" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="39" x2="60" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="ar-arms">
        <line x1="60" y1="48" x2="42" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="38" y="59" width="6" height="4" rx="2" fill="#64748b" />
        <line x1="60" y1="48" x2="78" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="76" y="59" width="6" height="4" rx="2" fill="#64748b" />
      </g>
      <line x1="60" y1="62" x2="50" y2="80" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="80" x2="48" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="62" x2="70" y2="80" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="80" x2="72" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function StandingLegRaiseVis({ playing }) {
  return (
    <svg viewBox="0 0 130 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes slegR { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-40deg)} }
        .slr-leg { transform-origin: 65px 68px; animation: ${playing ? "slegR 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="85" y="40" width="8" height="68" rx="2" fill="#94a3b8" />
      <line x1="20" y1="108" x2="110" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="22" r="9" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="31" x2="60" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="42" x2="80" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="42" x2="45" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="68" x2="52" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="90" x2="50" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="slr-leg">
        <line x1="65" y1="68" x2="73" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="73" y1="90" x2="78" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function SuryaNamaskarVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes sunSal { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes sunRays { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .sn-body { animation: ${playing ? "sunSal 3s ease-in-out infinite" : "none"}; }
        .sn-sun { transform-origin: 60px 15px; animation: ${playing ? "sunRays 8s linear infinite" : "none"}; }
      `}</style>
      <g className="sn-sun">
        <circle cx="60" cy="15" r="6" fill="#fbbf24" />
        {[0,45,90,135,180,225,270,315].map(a => 
          <line key={a} x1="60" y1="15" x2={60+Math.cos(a*Math.PI/180)*12} y2={15+Math.sin(a*Math.PI/180)*12} stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </g>
      <g className="sn-body">
        <circle cx="60" cy="38" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="46" x2="60" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="54" x2="44" y2="44" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="54" x2="76" y2="44" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="72" x2="48" y2="96" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="72" x2="72" y2="96" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="60" y="112" textAnchor="middle" fontSize="7" fill="#d97706">Namaste</text>
    </svg>
  );
}

function DownDogVis({ playing }) {
  return (
    <svg viewBox="0 0 150 100" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes ddBreathe { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        .dd { animation: ${playing ? "ddBreathe 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="85" x2="140" y2="85" stroke="#e2e8f0" strokeWidth="2" />
      <g className="dd">
        <circle cx="40" cy="35" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="45" y1="40" x2="75" y2="22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="22" x2="110" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="42" x2="38" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="44" y1="42" x2="48" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function BoatPoseVis({ playing }) {
  return (
    <svg viewBox="0 0 140 100" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes boatHold { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2deg)} }
        .boat { transform-origin: 70px 65px; animation: ${playing ? "boatHold 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="85" x2="130" y2="85" stroke="#e2e8f0" strokeWidth="2" />
      <g className="boat">
        <circle cx="55" cy="35" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="58" y1="42" x2="70" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="65" x2="100" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="58" y1="48" x2="85" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="50" x2="90" y2="34" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CobraVis({ playing }) {
  return (
    <svg viewBox="0 0 150 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes cobraUp { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-8deg)} }
        .cobra-up { transform-origin: 60px 62px; animation: ${playing ? "cobraUp 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="78" x2="140" y2="78" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="60" y1="72" x2="125" y2="74" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="cobra-up">
        <circle cx="38" cy="40" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="42" y1="46" x2="60" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="52" x2="48" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="58" x2="55" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function WarriorVis({ playing }) {
  return (
    <svg viewBox="0 0 140 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes warBreathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        .war { animation: ${playing ? "warBreathe 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="108" x2="130" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="war">
        <circle cx="70" cy="22" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="70" y1="30" x2="70" y2="62" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="40" x2="40" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="40" x2="100" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="62" x2="45" y2="85" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="85" x2="35" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="62" x2="95" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="95" y1="82" x2="105" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ChairPoseVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes chairH { 0%,100%{transform:translateY(0)} 50%{transform:translateY(2px)} }
        .ch-p { animation: ${playing ? "chairH 2.5s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="ch-p">
        <circle cx="60" cy="18" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="26" x2="60" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="34" x2="48" y2="14" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="34" x2="72" y2="14" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="58" x2="48" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="78" x2="48" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="58" x2="72" y2="78" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="78" x2="72" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function SidePlankVis({ playing }) {
  return (
    <svg viewBox="0 0 150 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes spHold { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        .sp-b { animation: ${playing ? "spHold 2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="78" x2="140" y2="78" stroke="#e2e8f0" strokeWidth="2" />
      <g className="sp-b">
        <circle cx="90" cy="22" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="87" y1="28" x2="65" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="24" x2="98" y2="10" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="65" y1="58" x2="35" y2="74" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="42" x2="65" y2="74" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function BridgePoseVis({ playing }) {
  return GluteBridgeVis({ playing });
}

function TreePoseVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes treeSway { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }
        .tree-b { transform-origin: 60px 106px; animation: ${playing ? "treeSway 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="tree-b">
        <circle cx="60" cy="18" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="26" x2="60" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="34" x2="52" y2="14" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="34" x2="68" y2="14" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="65" x2="58" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="75" x2="74" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="74" y1="68" x2="68" y2="85" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CatCowVis({ playing }) {
  return (
    <svg viewBox="0 0 150 90" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes catcow { 0%,100%{d:path("M40,45 Q70,30 100,45")} 50%{d:path("M40,45 Q70,58 100,45")} }
        .cc-spine { animation: ${playing ? "catcow 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="78" x2="140" y2="78" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="105" cy="35" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="40" y1="45" x2="40" y2="76" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="45" x2="50" y2="76" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="45" x2="90" y2="76" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="45" x2="100" y2="76" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40,45 Q70,30 100,42" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round">
        {playing && <animate attributeName="d" values="M40,45 Q70,30 100,42;M40,45 Q70,58 100,42;M40,45 Q70,30 100,42" dur="3s" repeatCount="indefinite" />}
      </path>
    </svg>
  );
}

function LegsUpWallVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes luwRelax { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .luw { animation: ${playing ? "luwRelax 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="90" y="5" width="8" height="110" rx="2" fill="#cbd5e1" />
      <line x1="10" y1="80" x2="90" y2="80" stroke="#e2e8f0" strokeWidth="2" />
      <g className="luw">
        <circle cx="40" cy="72" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="47" y1="72" x2="70" y2="72" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="70" x2="50" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="70" x2="55" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="72" x2="86" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="72" x2="86" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ShavasanaVis({ playing }) {
  return (
    <svg viewBox="0 0 160 70" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes breathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.04)} }
        .shav { transform-origin: 80px 40px; animation: ${playing ? "breathe 4s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="5" y1="52" x2="155" y2="52" stroke="#e2e8f0" strokeWidth="2" />
      <g className="shav">
        <circle cx="25" cy="42" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="32" y1="42" x2="90" y2="42" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="42" x2="30" y2="28" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="42" x2="42" y2="28" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="42" x2="115" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="42" x2="120" y2="48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {playing && <text x="80" y="65" textAnchor="middle" fontSize="7" fill="#16a34a">Breathe...</text>}
    </svg>
  );
}

function ForwardFoldVis({ playing }) {
  return (
    <svg viewBox="0 0 120 110" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes foldDeep { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(5deg)} }
        .fold-t { transform-origin: 60px 58px; animation: ${playing ? "foldDeep 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="100" x2="100" y2="100" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="55" y1="58" x2="50" y2="98" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="58" x2="70" y2="98" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="fold-t">
        <line x1="60" y1="58" x2="60" y2="30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="55" cy="75" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="58" y1="40" x2="48" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="40" x2="52" y2="92" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function TriangleVis({ playing }) {
  return (
    <svg viewBox="0 0 140 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes triHold { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2deg)} }
        .tri-b { transform-origin: 70px 65px; animation: ${playing ? "triHold 3s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="108" x2="130" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="tri-b">
        <circle cx="55" cy="30" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="58" y1="36" x2="70" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="40" x2="42" y2="95" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="45" x2="80" y2="18" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="65" x2="45" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="65" x2="100" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ChildPoseVis({ playing }) {
  return (
    <svg viewBox="0 0 150 80" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes childBreathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.03)} }
        .child-b { transform-origin: 75px 55px; animation: ${playing ? "childBreathe 4s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="10" y1="68" x2="140" y2="68" stroke="#e2e8f0" strokeWidth="2" />
      <g className="child-b">
        <circle cx="40" cy="52" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="47" y1="55" x2="85" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="52" x2="100" y2="45" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="45" x2="105" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="58" x2="25" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="58" x2="28" y2="58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function GobletSquatVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes gobsq { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
        .gs-b { animation: ${playing ? "gobsq 2.2s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <g className="gs-b">
        <circle cx="60" cy="18" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="26" x2="60" y2="60" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="38" x2="52" y2="48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="38" x2="68" y2="48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="50" y="46" width="20" height="6" rx="3" fill="#64748b" />
        <line x1="60" y1="60" x2="46" y2="80" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="80" x2="44" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="60" x2="74" y2="80" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="74" y1="80" x2="76" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function TricepPushdownVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes tpd { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(40deg)} }
        .tpd-fore { transform-origin: 68px 55px; animation: ${playing ? "tpd 1.6s ease-in-out infinite" : "none"}; }
      `}</style>
      <line x1="80" y1="5" x2="80" y2="20" stroke="#94a3b8" strokeWidth="2" />
      <line x1="20" y1="108" x2="100" y2="108" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="60" cy="24" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="60" y1="32" x2="60" y2="66" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="42" x2="50" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="42" x2="68" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="tpd-fore">
        <line x1="68" y1="55" x2="78" y2="40" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <line x1="60" y1="66" x2="50" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="90" x2="48" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="66" x2="70" y2="90" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="90" x2="72" y2="106" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FacePullVis({ playing }) {
  return (
    <svg viewBox="0 0 140 110" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes fpull { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-15px)} }
        .fp-arms { animation: ${playing ? "fpull 1.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <rect x="8" y="20" width="6" height="70" rx="2" fill="#94a3b8" />
      <line x1="20" y1="100" x2="120" y2="100" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="75" cy="24" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
      <line x1="75" y1="32" x2="75" y2="66" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <g className="fp-arms">
        <line x1="75" y1="42" x2="40" y2="38" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="38" x2="14" y2="45" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
        <line x1="75" y1="42" x2="40" y2="46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="46" x2="14" y2="50" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
      </g>
      <line x1="75" y1="66" x2="65" y2="96" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="66" x2="85" y2="96" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TubePullVis({ playing }) { return FacePullVis({ playing }); }

function HIITVis({ playing }) { return JumpingJacksVis({ playing }); }

function PranayamaVis({ playing }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes pranBreath { 0%,100%{r:8; opacity:0.3} 50%{r:22; opacity:0.1} }
        @keyframes pranBody { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        .pran-aura { animation: ${playing ? "pranBreath 4s ease-in-out infinite" : "none"}; }
        .pran-b { animation: ${playing ? "pranBody 4s ease-in-out infinite" : "none"}; transform-origin: 60px 50px; }
      `}</style>
      <circle className="pran-aura" cx="60" cy="50" r="22" fill="#38bdf8" opacity="0.1" />
      <g className="pran-b">
        <circle cx="60" cy="28" r="8" fill="none" stroke="#334155" strokeWidth="2.5" />
        <line x1="60" y1="36" x2="60" y2="65" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="45" x2="45" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="55" x2="52" y2="32" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="45" x2="75" y2="55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="65" x2="45" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="82" x2="35" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="65" x2="75" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="82" x2="85" y2="82" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {playing && <text x="60" y="105" textAnchor="middle" fontSize="7" fill="#0ea5e9">Inhale... Exhale...</text>}
    </svg>
  );
}

// Mapping keywords to visual components
const VIS_MAP = {
  "push-up": PushupVis,
  "pushup": PushupVis,
  "wall push": WallPushupVis,
  "squat": SquatVis,
  "goblet squat": GobletSquatVis,
  "plank pose": PlankVis,
  "plank": PlankVis,
  "side plank": SidePlankVis,
  "lunge": LungeVis,
  "row": RowVis,
  "tube row": RowVis,
  "curl": CurlVis,
  "bicep": CurlVis,
  "shoulder press": ShoulderPressVis,
  "floor press": FloorPressVis,
  "dead hang": DeadHangVis,
  "glute bridge": GluteBridgeVis,
  "mini loop": GluteBridgeVis,
  "calf raise": CalfRaiseVis,
  "calf raises": CalfRaiseVis,
  "bicycle crunch": CrunchVis,
  "lying leg raise": LegRaiseVis,
  "leg raise": StandingLegRaiseVis,
  "jumping jack": JumpingJacksVis,
  "high knee": HighKneesVis,
  "hiit": HIITVis,
  "chair sit": ChairSitStandVis,
  "sit-to-stand": ChairSitStandVis,
  "walk": WalkVis,
  "morning walk": WalkVis,
  "arm raise": SeatedArmRaiseVis,
  "seated arm": SeatedArmRaiseVis,
  "tube pull": TubePullVis,
  "face pull": FacePullVis,
  "tricep": TricepPushdownVis,
  "pushdown": TricepPushdownVis,
  "surya": SuryaNamaskarVis,
  "namaskar": SuryaNamaskarVis,
  "downward dog": DownDogVis,
  "boat pose": BoatPoseVis,
  "navasana": BoatPoseVis,
  "cobra": CobraVis,
  "bhujangasana": CobraVis,
  "forward fold": ForwardFoldVis,
  "bridge pose": BridgePoseVis,
  "bridge": BridgePoseVis,
  "shavasana": ShavasanaVis,
  "warrior": WarriorVis,
  "chair pose": ChairPoseVis,
  "tadasana": GenericVis,
  "mountain": GenericVis,
  "tree": TreePoseVis,
  "vrikshasana": TreePoseVis,
  "cat-cow": CatCowVis,
  "cat cow": CatCowVis,
  "legs up": LegsUpWallVis,
  "triangle": TriangleVis,
  "trikonasana": TriangleVis,
  "child": ChildPoseVis,
  "pranayama": PranayamaVis,
  "anulom": PranayamaVis,
};

// ─── YouTube Tutorial Videos for Each Exercise ───
// Curated short-form tutorials showing proper form
const YT_MAP = {
  "push-up": "IODxDxX7oi4",        // push up proper form
  "pushup": "IODxDxX7oi4",
  "wall push": "a6YHbXD2XlU",       // wall push ups
  "squat": "aclHkVaku9U",           // bodyweight squat form
  "goblet squat": "MeIiIdhvXT4",    // goblet squat tutorial
  "plank": "ASdvN_XEl_c",           // plank proper form
  "plank pose": "ASdvN_XEl_c",
  "side plank": "K2VljzCC16g",      // side plank
  "lunge": "QOVaHwm-Q6U",          // lunge form
  "row": "pYcpY20QaE8",            // dumbbell row
  "tube row": "xQNrFHEMhI4",       // resistance band row
  "curl": "ykJmrZ5v0Oo",           // bicep curl form
  "bicep": "ykJmrZ5v0Oo",
  "shoulder press": "qEwKCR5JCog",  // DB shoulder press
  "floor press": "uUGDRwge4F8",     // dumbbell floor press
  "dead hang": "tBRGErADrWE",       // dead hang tutorial
  "glute bridge": "OUgsJ8-Vi0E",    // glute bridge
  "mini loop": "OUgsJ8-Vi0E",
  "calf raise": "gwLzBJYoWlI",      // calf raises
  "bicycle crunch": "9FGilxCbdz8",  // bicycle crunches
  "lying leg raise": "l4kQd9eWclE",  // lying leg raises
  "leg raise": "l4kQd9eWclE",
  "jumping jack": "iSSAk4XCsRA",    // jumping jacks
  "high knee": "tx5rgpDAJRI",       // high knees
  "hiit": "iSSAk4XCsRA",
  "chair sit": "MVSGEkR0fXE",       // sit to stand exercise
  "sit-to-stand": "MVSGEkR0fXE",
  "walk": "brFHyOtTwH4",            // proper walking form
  "morning walk": "brFHyOtTwH4",
  "arm raise": "YbX7Wd8jQ-Q",       // seated arm raises
  "seated arm": "YbX7Wd8jQ-Q",
  "tube pull": "xQNrFHEMhI4",       // band pulls
  "face pull": "rep-qVOkqgk",       // face pulls with band
  "tricep": "2-LAMcpzODU",          // tricep pushdown
  "pushdown": "2-LAMcpzODU",
  "surya": "aUSQkRawkSo",           // surya namaskar
  "namaskar": "aUSQkRawkSo",
  "downward dog": "EC7RGJ975Hk",     // downward dog
  "boat pose": "QS6wfQXFEEo",       // boat pose
  "navasana": "QS6wfQXFEEo",
  "cobra": "fOdrW7nf9gE",           // cobra pose
  "bhujangasana": "fOdrW7nf9gE",
  "forward fold": "g7Uhp5tphAs",     // seated forward fold
  "bridge pose": "OUgsJ8-Vi0E",     // bridge pose
  "bridge": "OUgsJ8-Vi0E",
  "shavasana": "1VYlOKUdylM",       // shavasana relaxation
  "warrior": "Mn6RSIRCV3w",         // warrior I & II
  "chair pose": "hbGOwUAr3iA",      // chair pose utkatasana
  "tadasana": "2HTvZp5rPrg",        // mountain pose
  "mountain": "2HTvZp5rPrg",
  "tree": "Fr5kiIygm0c",            // tree pose
  "vrikshasana": "Fr5kiIygm0c",
  "cat-cow": "kqnua4rHVVA",         // cat cow stretch
  "cat cow": "kqnua4rHVVA",
  "legs up": "yDVCNhkbDAw",         // legs up the wall
  "triangle": "S6gB0QHbWFE",        // triangle pose
  "trikonasana": "S6gB0QHbWFE",
  "child": "2MJGg-dUKh0",           // child's pose
  "pranayama": "8VwufJrUhxk",       // anulom vilom
  "anulom": "8VwufJrUhxk",
};

function getYouTubeId(name) {
  const key = name.toLowerCase().replace(/[^a-z ]/g, "");
  const match = Object.keys(YT_MAP).find(k => key.includes(k));
  return match ? YT_MAP[match] : null;
}

// ─── Original App Data ───
const FAMILY = {
  yash: {
    name: "Yash", age: 29, emoji: "💪", height: "5'10.5\"", weight: 80, bmi: 25.3,
    diet: "Vegetarian", wakeTime: "8:00 AM", exerciseTime: "5–7 PM", color: "#D97706",
    goals: ["Build muscle", "Lose fat", "Fix triglycerides", "Prevent kidney stones"],
    healthIssues: [
      { l: "Triglycerides", v: "198 mg/dL", s: "high" },
      { l: "Vitamin D", v: "11.3 ng/mL", s: "critical" },
      { l: "Vitamin B12", v: "229 pg/mL", s: "low" },
      { l: "Hemoglobin", v: "12.9 gm/dL", s: "low" },
      { l: "Fasting Glucose", v: "82.3 mg/dL", s: "ok" },
    ],
    supplements: [
      { name: "Calcirol 60,000 IU", freq: "Weekly × 8 weeks, then monthly", when: "Any fixed day", status: "start", icon: "☀️" },
      { name: "Methylcobalamin 1000–1500mcg", freq: "Daily", when: "Morning with breakfast", status: "start", icon: "💊" },
      { name: "Calcium Citrate 500mg", freq: "Daily", when: "With a meal (not same time as iron)", status: "start", icon: "🦴" },
      { name: "Whey Protein 2 scoops (~50–60g)", freq: "Daily", when: "1 scoop post-workout + 1 scoop with breakfast/milk", status: "buy", icon: "🥛" },
    ],
    hydrationTarget: 4,
    hydrationTip: "Add nimbu (lemon) to 2 bottles — citrate prevents oxalate stones",
    medicalActions: [
      "Serum ferritin test — confirm iron deficiency",
      "Aggressive hydration + dietary oxalate management",
    ],
    donts: [
      { text: "NO ab roller in Month 1 — core needs baseline plank strength first. Start Week 5+", icon: "🚫" },
      { text: "NEVER hold breath during exercises (Valsalva) — exhale on push/pull, inhale on release", icon: "🫁" },
      { text: "NO skipping warm-up or cool-down — 5 min each, every session", icon: "⏱️" },
      { text: "NO excess ghee — driving your triglycerides up (198 mg/dL)", icon: "🧈" },
      { text: "NO sugary chai — switch to no-sugar or jaggery (max 1 cup/day)", icon: "🍵" },
      { text: "NO white rice — switch to brown rice or reduce portion", icon: "🍚" },
      { text: "NO skipping protein — you need 120–130g/day, currently getting ~40–50g", icon: "🥩" },
      { text: "NO high-oxalate foods without water: spinach, peanuts, chocolate, beets, cashews", icon: "⚠️" },
      { text: "NO exercising without pre-workout snack (60–90 min before)", icon: "🍌" },
      { text: "NO delaying post-workout protein — within 30–45 min after training", icon: "⏰" },
      { text: "NO training through sharp joint pain — muscle soreness is OK, joint pain means STOP", icon: "🛑" },
    ],
    dailySchedule: [
      { time: "8:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "8:00–9:00", task: "Finish Bottle 1 (1L) before breakfast", icon: "🫗" },
      { time: "8:30 AM", task: "Take Methylcobalamin + Calcium Citrate with breakfast", icon: "💊" },
      { time: "9:00 AM", task: "Protein-rich breakfast (paneer/eggs/sprouts/moong chilla + curd)", icon: "🍳" },
      { time: "9:00–1:00", task: "Finish Bottle 2 (1L) before lunch", icon: "🫗" },
      { time: "11:00 AM", task: "Mid-morning snack: handful of almonds + fruit", icon: "🥜" },
      { time: "1:00 PM", task: "Lunch: dal/sabzi + 2 roti + small rice. Add curd/raita", icon: "🍽️" },
      { time: "1:00–5:00", task: "Finish Bottle 3 (1L) before evening chai", icon: "🫗" },
      { time: "3:30 PM", task: "Pre-workout snack: banana + almonds OR roti + peanut butter", icon: "🍌" },
      { time: "4:00 PM", task: "After chai → drink 1 glass water (chai dehydrates)", icon: "🍵" },
      { time: "5:00–7:00", task: "EXERCISE SESSION (strength/yoga per schedule)", icon: "🏋️" },
      { time: "5:00–7:00", task: "Finish Bottle 4 (1L). Reduce after 8:30 PM", icon: "🫗" },
      { time: "7:00–7:30", task: "Post-workout: Whey shake + banana within 30–45 min", icon: "🥛" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "🚶" },
      { time: "8:30 PM", task: "Dinner: roti + sabzi/dal. Eat 1–1.5 hrs after protein shake", icon: "🍽️" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
  anil: {
    name: "Anil Ji", age: 56, emoji: "🧘", height: "5'9\"", weight: 83, bmi: 27,
    diet: "Veg + Non-veg 2×/week", wakeTime: "6:00 AM", exerciseTime: "6–7:30 AM", color: "#2563EB",
    goals: ["Heart health", "Weight loss", "Manage BP", "Kidney stone management"],
    healthIssues: [
      { l: "Vitamin B12", v: "107 pg/mL", s: "critical" },
      { l: "Vitamin D", v: "12.3 ng/mL", s: "critical" },
      { l: "Triglycerides", v: "178 mg/dL", s: "high" },
      { l: "Fasting Glucose", v: "99.8 mg/dL", s: "warning" },
      { l: "Kidney Stone", v: "18mm active", s: "critical" },
      { l: "BP", v: "On Cilacar 10", s: "managed" },
      { l: "LDL", v: "51.1 mg/dL", s: "ok" },
    ],
    supplements: [
      { name: "Cilacar 10 (Cilnidipine 10mg)", freq: "Daily", when: "After breakfast — BEFORE exercise", status: "taking", icon: "💗" },
      { name: "Calcirol 60,000 IU", freq: "Weekly", when: "Fixed day (e.g., Sunday)", status: "taking", icon: "☀️" },
      { name: "Methylcobalamin 1500mcg", freq: "Daily", when: "Replace Neurobion — only 15mcg B12, INSUFFICIENT", status: "switch", icon: "💊" },
      { name: "Calcium Citrate 500mg + Mag 250mg", freq: "Daily", when: "With a meal", status: "start", icon: "🦴" },
    ],
    hydrationTarget: 4,
    hydrationTip: "Add nimbu (lemon) to 1–2 bottles — citrate prevents calcium oxalate stones. CRITICAL with 18mm stone",
    medicalActions: [
      "Discuss B12 injections vs high-dose oral methylcobalamin with doctor",
      "Urologist follow-up for 18mm kidney stone monitoring",
      "Urine culture to rule out low-grade infection (borderline pus cells)",
      "Discuss Potassium Citrate for stone prevention with urologist",
    ],
    donts: [
      { text: "NO heavy overhead lifting — dangerous with hypertension", icon: "🚫" },
      { text: "NO head-below-heart positions for extended time (e.g., prolonged forward folds)", icon: "🙃" },
      { text: "NEVER hold breath during exercise (Valsalva maneuver) — can spike BP dangerously", icon: "🫁" },
      { text: "NO exercising without taking Cilacar first — take after breakfast, before workout", icon: "💊" },
      { text: "NO pushing through lightheadedness — sit down immediately", icon: "💫" },
      { text: "NO exercising without water nearby — sip between every set", icon: "💧" },
      { text: "NO excess ghee — driving triglycerides (178) and dangerous with kidney stone", icon: "🧈" },
      { text: "NO sugary chai — borderline pre-diabetic (glucose 99.8). Switch to no sugar", icon: "🍵" },
      { text: "NO dehydration — with 18mm kidney stone, low water is extremely dangerous", icon: "⚠️" },
      { text: "NO high-sodium/processed foods — worsens BP and kidney stones", icon: "🧂" },
      { text: "NO skipping lemon water — citrate is your kidney stone prevention", icon: "🍋" },
      { text: "NO ignoring sharp pain in joints — muscle soreness OK, joint pain means STOP", icon: "🛑" },
    ],
    dailySchedule: [
      { time: "6:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "6:00–6:10", task: "Glass of water + 2–3 soaked almonds before walk", icon: "🥜" },
      { time: "6:10–6:40", task: "Morning walk (30 min) — with Savita Ji", icon: "🚶" },
      { time: "6:40–7:15", task: "Exercises OR Yoga (per day schedule) — with Savita Ji", icon: "🏋️" },
      { time: "7:15–7:20", task: "Pranayama — Anulom Vilom (5 min) — DAILY", icon: "🧘" },
      { time: "7:15–8:00", task: "Finish Bottle 1 (1L) before breakfast", icon: "🫗" },
      { time: "7:30 AM", task: "Breakfast within 30–45 min of exercise. ADD PROTEIN", icon: "🍳" },
      { time: "After breakfast", task: "Take Cilacar 10 + Methylcobalamin + Calcium-Mag", icon: "💊" },
      { time: "8:00–12:00", task: "Finish Bottle 2 (1L) — add nimbu to this one", icon: "🍋" },
      { time: "11:00 AM", task: "Mid-morning: fruit + handful of nuts", icon: "🍎" },
      { time: "1:00 PM", task: "Lunch: dal + sabzi + 2 roti. Reduce rice. Add raita", icon: "🍽️" },
      { time: "1:00–5:00", task: "Finish Bottle 3 (1L) — add nimbu", icon: "🍋" },
      { time: "4:00 PM", task: "Chai (no sugar!) → follow with 1 glass water", icon: "🍵" },
      { time: "5:00–8:00", task: "Finish Bottle 4 (1L). Reduce after 8:30 PM", icon: "🫗" },
      { time: "7:30 PM", task: "Dinner", icon: "🍽️" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "🚶" },
      { time: "~10:00 PM", task: "Sleep", icon: "😴" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
  savita: {
    name: "Savita Ji", age: "~55", emoji: "🌸", height: "5'3\"", weight: 80, bmi: 31.2,
    diet: "Vegetarian", wakeTime: "6:00 AM", exerciseTime: "6–7:30 AM", color: "#7C3AED",
    goals: ["Blood sugar control", "Bone health", "Gentle conditioning", "Weight loss"],
    healthIssues: [
      { l: "HbA1c", v: "6.90%", s: "critical" },
      { l: "Fasting Glucose", v: "121.7 mg/dL", s: "high" },
      { l: "Hemoglobin", v: "11.10 gm/dL", s: "low" },
      { l: "Calcium", v: "8.40 mg/dL", s: "low" },
      { l: "LDL", v: "127.54 mg/dL", s: "high" },
      { l: "Osteoporosis Risk", v: "HIGH — 5yr low estrogen", s: "critical" },
    ],
    supplements: [
      { name: "Newcal-Forte Softgel (Calcitriol+Ca+Mg+Zn)", freq: "Daily", when: "With lunch (good combo for bones)", status: "taking", icon: "🦴" },
      { name: "Calcirol 60,000 IU", freq: "Weekly", when: "Fixed day (e.g., Sunday)", status: "taking", icon: "☀️" },
      { name: "Protein Powder (4 spoons = 30g protein)", freq: "Daily — 2 doses", when: "2 spoons morning milk + 2 spoons evening milk", status: "start", icon: "🥛" },
      { name: "Methylcobalamin 500–1000mcg", freq: "Daily", when: "With breakfast (maintenance)", status: "start", icon: "💊" },
    ],
    hydrationTarget: 3,
    hydrationTip: "Can add jeera (cumin) to 1 bottle. Front-load: 2 bottles by 2 PM, last bottle 2–7 PM, minimal after 8 PM for sleep",
    medicalActions: [
      "Doctor evaluation for diabetes medication (metformin?) — HbA1c 6.9%",
      "Serum ferritin + iron studies — confirm iron deficiency anemia",
      "DEXA scan for bone density — URGENT (5yr low estrogen, cancer surgery)",
      "Urine microalbumin/creatinine ratio — early diabetic kidney check",
    ],
    donts: [
      { text: "NO high-impact — NO jumping, running, burpees. Bones are at risk", icon: "🚫" },
      { text: "NO fast or jerky movements — everything slow and controlled", icon: "🐢" },
      { text: "NO balance exercises without chair support — fall risk", icon: "🪑" },
      { text: "NO skipping post-dinner walk — most important habit for blood sugar (reduces spike 30–40%)", icon: "⭐" },
      { text: "NO skipping calf cramp routine before bed — 3 min daily without exception", icon: "🦵" },
      { text: "NO ghee cooking — gallbladder removed, cannot process fat properly", icon: "🧈" },
      { text: "NO white rice — HIGH glycemic index, spikes blood sugar directly", icon: "🍚" },
      { text: "NO sugary chai — diabetic (HbA1c 6.9%). Zero sugar or stevia only", icon: "🍵" },
      { text: "NO large meals — eat smaller, more frequent meals for blood sugar", icon: "🍽️" },
      { text: "NO skipping protein — bones and muscles need it. 30g/day from powder", icon: "🥛" },
      { text: "NO water after 8 PM — affects your sleep", icon: "🌙" },
      { text: "If knee pain (winter) — seated-only exercises, NO standing", icon: "🦿" },
      { text: "NO ignoring leg cramps — may indicate worsening calcium deficiency", icon: "⚠️" },
    ],
    dailySchedule: [
      { time: "6:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "6:00–6:10", task: "Glass of water + 2–3 soaked almonds before walk", icon: "🥜" },
      { time: "6:10–6:40", task: "Morning walk (30 min) — with Anil Ji", icon: "🚶" },
      { time: "6:40–7:15", task: "Exercises OR Yoga (per day schedule) — with Anil Ji", icon: "🏋️" },
      { time: "6:00–8:00", task: "Finish Bottle 1 (1L). Front-load water!", icon: "🫗" },
      { time: "7:30 AM", task: "Breakfast within 30–45 min of exercise. ADD PROTEIN", icon: "🍳" },
      { time: "7:30 AM", task: "Morning milk with 2 spoons protein powder", icon: "🥛" },
      { time: "After breakfast", task: "Take Methylcobalamin + Newcal-Forte with meal", icon: "💊" },
      { time: "8:00–1:00", task: "Finish Bottle 2 (1L) — both bottles by 2 PM!", icon: "🫗" },
      { time: "11:00 AM", task: "Mid-morning: fruit + soaked almonds/walnuts", icon: "🍎" },
      { time: "1:00 PM", task: "Lunch: dal + sabzi + 1–2 roti. NO white rice. Add curd", icon: "🍽️" },
      { time: "2:00–7:00", task: "Finish Bottle 3 (1L). Minimal water after 8 PM!", icon: "🫗" },
      { time: "4:00 PM", task: "Chai (NO SUGAR) → follow with 1 glass water", icon: "🍵" },
      { time: "5:00 PM", task: "Snack: chana chaat / roasted makhana / sprouts", icon: "🥗" },
      { time: "7:00 PM", task: "Light dinner: 1 roti + 1 katori sabzi/dal", icon: "🍽️" },
      { time: "7:10 PM", task: "Wait 10 min after dinner...", icon: "⏳" },
      { time: "7:20 PM", task: "⭐ POST-DINNER WALK — 10 min — NON-NEGOTIABLE ⭐", icon: "🚶‍♀️" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "👨‍👩‍👦" },
      { time: "9:00 PM", task: "Milk with 2 spoons protein powder", icon: "🥛" },
      { time: "Before bed", task: "🦵 Calf cramp routine (3 min): ankle circles → point/flex → calf stretch", icon: "🌙" },
      { time: "~10:00 PM", task: "Sleep (try Shavasana relaxation if difficulty sleeping)", icon: "😴" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
};

const YASH_WARMUP = [
  "Jumping jacks 1 min", "Arm circles 30s each", "Squats ×10", "Hip circles ×10 each", "High knees 30s",
];
const YASH_COOLDOWN = [
  "Chest stretch 20s", "Hamstring stretch 20s each", "Quad stretch 20s each", "Shoulder stretch 20s each", "Child's pose 30s",
];

const EX = {
  yash: {
    str: {
      "week1-2": {
        mon: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Rows 5kg (each arm)", s: 2, r: 10, e: "5kg DB + Chair" },
          { n: "Bodyweight Squats", s: 2, r: 12, e: "Bodyweight" },
          { n: "Tube Bicep Curls", s: 2, r: 10, e: "Medium Tube" },
          { n: "Plank", s: 2, r: "20 sec", e: "Mat" },
        ],
        wed: "mon",
        fri: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Shoulder Press 5kg", s: 2, r: 10, e: "5kg Dumbbells" },
          { n: "Lunges (bodyweight)", s: 2, r: "8 each", e: "Bodyweight" },
          { n: "Tube Face Pulls", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Lying Leg Raises", s: 2, r: 10, e: "Mat" },
        ],
      },
      "week3": {
        mon: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Floor Press 5kg", s: 2, r: 12, e: "5kg DB + Mat" },
          { n: "DB Shoulder Press 5kg", s: 2, r: 10, e: "5kg Dumbbells" },
          { n: "Tube Tricep Pushdowns", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Plank", s: 2, r: "25 sec", e: "Mat" },
        ],
        wed: [
          { n: "Dead Hangs", s: 2, r: "max hold (15–20s)", e: "Pull-up Bar" },
          { n: "DB Rows 5kg (each arm)", s: 2, r: 10, e: "5kg DB + Chair" },
          { n: "Tube Rows (door chest)", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Tube Face Pulls", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Tube Bicep Curls", s: 2, r: 10, e: "Medium Tube" },
        ],
        fri: [
          { n: "Bodyweight Squats", s: 2, r: 15, e: "Bodyweight" },
          { n: "DB Goblet Squats 5kg", s: 2, r: 12, e: "5kg Dumbbell" },
          { n: "DB Lunges 5kg", s: 2, r: "8 each", e: "5kg Dumbbells" },
          { n: "Mini Loop Glute Bridges", s: 2, r: 15, e: "Band + Mat" },
          { n: "Calf Raises", s: 2, r: 20, e: "Bodyweight" },
          { n: "Bicycle Crunches", s: 2, r: 15, e: "Mat" },
        ],
      },
      "week4": {
        mon: [
          { n: "Push-ups", s: 3, r: "max", e: "Bodyweight" },
          { n: "DB Floor Press 5kg", s: 3, r: 12, e: "5kg DB + Mat" },
          { n: "DB Shoulder Press 5kg", s: 3, r: 10, e: "5kg Dumbbells" },
          { n: "Tube Tricep Pushdowns", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Plank", s: 3, r: "25 sec", e: "Mat" },
        ],
        wed: [
          { n: "Dead Hangs", s: 3, r: "max hold", e: "Pull-up Bar" },
          { n: "DB Rows 5kg (each arm)", s: 3, r: 10, e: "5kg DB + Chair" },
          { n: "Tube Rows", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Tube Face Pulls", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Tube Bicep Curls", s: 3, r: 10, e: "Medium Tube" },
        ],
        fri: [
          { n: "Bodyweight Squats", s: 3, r: 15, e: "Bodyweight" },
          { n: "DB Goblet Squats 5kg", s: 3, r: 12, e: "5kg Dumbbell" },
          { n: "DB Lunges 5kg", s: 3, r: "8 each", e: "5kg Dumbbells" },
          { n: "Mini Loop Glute Bridges", s: 3, r: 15, e: "Band + Mat" },
          { n: "Calf Raises", s: 3, r: 20, e: "Bodyweight" },
          { n: "Bicycle Crunches", s: 3, r: 15, e: "Mat" },
        ],
        sat: [
          { n: "HIIT — Jumping Jacks (20s/40s rest)", s: 3, r: "20 sec", e: "Bodyweight" },
          { n: "HIIT — High Knees (20s/40s rest)", s: 3, r: "20 sec", e: "Bodyweight" },
        ],
      },
    },
    yoga: {
      "week1-2": [
        { n: "Surya Namaskar — 3 slow rounds", d: "5–6 min", desc: "Full body flow" },
        { n: "Downward Dog", d: "30 sec", desc: "Hamstrings, calves, shoulders" },
        { n: "Plank Pose", d: "20–30 sec", desc: "Core — straight line head to heels" },
        { n: "Boat Pose (Navasana)", d: "15–20 sec × 2", desc: "Core. Bend knees if needed" },
        { n: "Cobra (Bhujangasana)", d: "20 sec × 2", desc: "Chest opener" },
        { n: "Seated Forward Fold", d: "30 sec", desc: "Back + hamstring stretch" },
        { n: "Bridge Pose", d: "20 sec × 2", desc: "Glutes, core" },
        { n: "Shavasana", d: "3–5 min", desc: "Full relaxation" },
      ],
      "week3-4": [
        { n: "Surya Namaskar × 3", d: "5–6 min", desc: "Sun salutations" },
        { n: "Warrior I & II", d: "20–30 sec each side", desc: "Leg strength, hip opener" },
        { n: "Chair Pose", d: "20–30 sec", desc: "Quad and glute burn" },
        { n: "Downward Dog → Plank flow", d: "30 sec each", desc: "Core + upper body" },
        { n: "Side Plank", d: "15–20 sec each", desc: "Obliques. Drop knee if needed" },
        { n: "Cobra × 2", d: "20 sec", desc: "Chest opener" },
        { n: "Boat Pose × 2", d: "15–20 sec", desc: "Core" },
        { n: "Seated Forward Fold", d: "30 sec", desc: "Stretch" },
        { n: "Bridge × 2 (or Wheel)", d: "20–30 sec", desc: "Backbend" },
        { n: "Shavasana", d: "3–5 min", desc: "Relaxation" },
      ],
    },
  },
  parents: {
    str: {
      "week1-2": {
        f: [
          { n: "Chair Sit-to-Stand", s: 1, r: 8 },
          { n: "Wall Push-ups", s: 1, r: 8 },
          { n: "Standing Calf Raises (chair)", s: 1, r: 10 },
          { n: "Tube Rows (door anchor)", s: 1, r: 8 },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 1, r: 8 },
          { n: "Wall Push-ups", s: 1, r: "6–8" },
          { n: "Standing Calf Raises (chair)", s: 1, r: 10 },
          { n: "Seated Arm Raises (1kg)", s: 1, r: 8 },
        ],
      },
      "week3": {
        f: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: 8 },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Tube Rows", s: 2, r: 8 },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: "6–8" },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Seated Arm Raises (1kg)", s: 2, r: 8 },
        ],
      },
      "week4": {
        f: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: 8 },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Tube Rows", s: 2, r: 8 },
          { n: "DB Bicep Curls 5kg", s: 2, r: 8 }, { n: "Standing Leg Raises (chair)", s: 2, r: "8 each" },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: "6–8" },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Seated Arm Raises (1kg)", s: 2, r: 8 },
          { n: "Tube Pulls (light)", s: 2, r: 8 }, { n: "Standing Leg Raises (chair)", s: 2, r: "8 each" },
        ],
      },
    },
    yoga: {
      "week1-2": [
        { n: "Tadasana (Mountain)", d: "30 sec", desc: "Stand tall, align body" },
        { n: "Vrikshasana (Tree) + chair", d: "15 sec each", desc: "Balance, NOT on knee" },
        { n: "Cat-Cow", d: "8–10 rounds", desc: "Spinal mobility" },
        { n: "Legs Up Wall", d: "2–3 min", desc: "Reduces swelling/cramps" },
        { n: "Shavasana", d: "2–3 min", desc: "Deep relaxation" },
      ],
      "week3-4": [
        { n: "Tadasana", d: "30 sec", desc: "Alignment" },
        { n: "Vrikshasana (Tree) + chair", d: "15 sec each", desc: "Balance" },
        { n: "Trikonasana (Triangle)", d: "15–20 sec each", desc: "Hip opener, weight-bearing" },
        { n: "Cat-Cow", d: "8 rounds", desc: "Spinal mobility" },
        { n: "Bridge Pose", d: "15–20 sec × 2", desc: "Glutes, core" },
        { n: "Child's Pose", d: "30–60 sec", desc: "Back stretch, calming" },
        { n: "Legs Up Wall", d: "2–3 min", desc: "Relaxation" },
        { n: "Shavasana", d: "2–3 min", desc: "Full relaxation" },
      ],
    },
  },
};

const todayKey = () => new Date().toISOString().slice(0, 10);
const dayN = () => ["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];
const dayL = () => ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
const sCol = (s) => ({critical:"#DC2626",high:"#EA580C",low:"#D97706",warning:"#CA8A04",ok:"#16A34A",managed:"#2563EB",taking:"#16A34A",start:"#EA580C",buy:"#7C3AED",insufficient:"#DC2626",switch:"#D97706"}[s]||"#6B7280");
const sBg = (s) => ({critical:"#FEF2F2",high:"#FFF7ED",low:"#FFFBEB",warning:"#FEFCE8",ok:"#F0FDF4",managed:"#EFF6FF",taking:"#F0FDF4",start:"#FFF7ED",buy:"#F5F3FF",insufficient:"#FEF2F2",switch:"#FFFBEB"}[s]||"#F9FAFB");

// ─── Persistent Storage (localStorage for Netlify) ───
function load(p, t, fb) {
  try { const v = localStorage.getItem(`cf:${p}:${t}`); return v ? JSON.parse(v) : fb; } catch { return fb; }
}

function save(p, t, d) {
  try { localStorage.setItem(`cf:${p}:${t}`, JSON.stringify(d)); } catch {}
}

// Auto-detect week based on stored start date
function getStartDate() {
  try { return localStorage.getItem("cf:startDate") || null; } catch { return null; }
}
function setStartDateLS(date) {
  try { localStorage.setItem("cf:startDate", date); } catch {}
}

function calcWeek(startDate) {
  if (!startDate) return "week1-2";
  const start = new Date(startDate);
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(diffDays / 7) + 1;
  if (weekNum <= 2) return "week1-2";
  if (weekNum === 3) return "week3";
  return "week4";
}

export default function App() {
  const [scr, setScr] = useState("dash");
  const [per, setPer] = useState(null);
  const [ld, setLd] = useState(true);
  const [prog, setProg] = useState({ yash:{}, anil:{}, savita:{} });
  const [currentWeek, setCurrentWeek] = useState("week1-2");
  const [startDateVal, setStartDateVal] = useState(null);

  useEffect(() => {
    const pp=["yash","anil","savita"], tt=["exercises","hydration","supplements","habits","metrics"];
    const d={yash:{},anil:{},savita:{}};
    for(const p of pp) for(const t of tt) d[p][t]=load(p,t,{});
    // Load or set start date
    let sd = getStartDate();
    if (!sd) {
      sd = new Date().toISOString().slice(0, 10);
      setStartDateLS(sd);
    }
    setStartDateVal(sd);
    setCurrentWeek(calcWeek(sd));
    setProg(d);
    setLd(false);
  }, []);

  const upd = useCallback((p,t,date,val) => {
    setProg(prev => {
      const n={...prev,[p]:{...prev[p],[t]:{...prev[p][t],[date]:val}}};
      save(p,t,n[p][t]);
      return n;
    });
  }, []);

  const resetProgram = useCallback(() => {
    const sd = new Date().toISOString().slice(0, 10);
    setStartDateLS(sd);
    setStartDateVal(sd);
    setCurrentWeek("week1-2");
  }, []);

  const go = (s,p) => { if(p!==undefined) setPer(p); setScr(s); };

  if(ld) return(
    <div style={{...$.app,...$.cen}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet"/>
      <div style={{fontSize:52,marginBottom:12}}>🏠</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:"#1a1a2e"}}>Chaudhary Family</div>
      <div style={{fontSize:13,color:"#999",marginTop:4}}>Loading...</div>
    </div>
  );

  const views = {
    dash: <Dash prog={prog} go={go} startDate={startDateVal} currentWeek={currentWeek} resetProgram={resetProgram}/>,
    profile: <Prof p={per} prog={prog[per]} upd={upd} go={go}/>,
    schedule: <Sched p={per} go={go}/>,
    donts: <DontsView p={per} go={go}/>,
    exercises: <Exer p={per} prog={prog[per]} upd={upd} go={go} currentWeek={currentWeek} setCurrentWeek={setCurrentWeek}/>,
    hydration: <Hydra p={per} prog={prog[per]} upd={upd} go={go}/>,
    supplements: <Supps p={per} prog={prog[per]} upd={upd} go={go}/>,
    tracking: <Track p={per} prog={prog[per]} upd={upd} go={go}/>,
    medical: <Med p={per} prog={prog[per]} upd={upd} go={go}/>,
  };

  return(
    <div style={$.app}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}button:active{opacity:.85}@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .25s ease}@keyframes expandVis{from{max-height:0;opacity:0}to{max-height:500px;opacity:1}}.vis-expand{animation:expandVis .4s ease forwards;overflow:hidden}`}</style>
      {views[scr]}
    </div>
  );
}

function Dash({prog, go, startDate, currentWeek, resetProgram}) {
  const td=todayKey();
  const st=(k)=>{const p=prog[k];const ex=p.exercises?.[td]?.completed?.length||0;const hy=p.hydration?.[td]?.bottles||0;
    const ht=FAMILY[k].hydrationTarget;const sd=p.supplements?.[td]?.taken?.length||0;const st=FAMILY[k].supplements.length;
    let dn=0;if(ex>0)dn++;if(hy>=ht)dn++;if(sd>=st)dn++;return{ex,hy,ht,sd,st,pct:Math.round(dn/3*100)};};
  const wkLabel = currentWeek === "week1-2" ? "Week 1–2" : currentWeek === "week3" ? "Week 3" : "Week 4+";
  const daysSince = startDate ? Math.floor((new Date() - new Date(startDate)) / 86400000) : 0;

  return(
    <div style={$.scr} className="fi">
      <div style={{textAlign:"center",padding:"20px 0 16px"}}>
        <div style={{fontSize:11,color:"#999",letterSpacing:1.5,textTransform:"uppercase"}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
        <h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:900,color:"#1a1a2e",margin:"4px 0 0"}}>Chaudhary Family</h1>
        <p style={{fontSize:13,color:"#888",margin:"2px 0 0"}}>Health & Fitness Tracker</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:14}}>
        <div style={{background:"#fff",borderRadius:10,padding:"6px 14px",fontSize:11,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
          <span style={{color:"#999"}}>Program:</span> <span style={{fontWeight:700,color:"#D97706"}}>{wkLabel}</span>
          <span style={{color:"#ccc",margin:"0 4px"}}>·</span>
          <span style={{color:"#999"}}>Day {daysSince + 1}</span>
        </div>
        <button onClick={resetProgram} style={{background:"#fff",border:"1px solid #e5e5e5",borderRadius:10,padding:"6px 10px",fontSize:10,color:"#999",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}} title="Reset program start date to today">↻ Reset</button>
      </div>
      {Object.entries(FAMILY).map(([k,m])=>{const s=st(k);return(
        <button key={k} onClick={()=>go("profile",k)} style={{...$.card,borderLeft:`4px solid ${m.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <span style={{fontSize:34}}>{m.emoji}</span>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"#1a1a2e",marginTop:4}}>{m.name}</div>
              <div style={{fontSize:11,color:"#999",marginTop:1}}>Age {m.age} · BMI {m.bmi}</div>
            </div>
            <Circ pct={s.pct} col={m.color}/>
          </div>
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            <Ch l="Exercise" v={s.ex>0?"Done ✓":"—"} c={s.ex>0?"#16A34A":"#999"}/>
            <Ch l="Water" v={`${s.hy}/${s.ht}L`} c={s.hy>=s.ht?"#16A34A":"#3B82F6"}/>
            <Ch l="Supps" v={`${s.sd}/${s.st}`} c={s.sd>=s.st?"#16A34A":"#F59E0B"}/>
          </div>
        </button>
      );})}
      <div style={{marginTop:16,background:"#fff",borderRadius:14,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:8}}>⚠️ Shared Family Patterns</div>
        {["Vitamin D deficiency — all 3","Elevated triglycerides — all 3 (198, 178, 145.8)","Anemia markers — Yash + Mother (iron), Father (B12)","Urine albumin traces — all 3","Key fix: Less ghee · More protein · No sugar chai · More water"].map((t,i)=>
          <div key={i} style={{fontSize:12,color:"#555",padding:"3px 0",borderBottom:"1px solid #f5f5f5",lineHeight:1.5}}>{t}</div>
        )}
      </div>
    </div>
  );
}
function Circ({pct,col}){const r=20,c=2*Math.PI*r;return(<div style={{position:"relative",width:50,height:50}}><svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r={r} fill="none" stroke="#f0f0f0" strokeWidth="4"/><circle cx="25" cy="25" r={r} fill="none" stroke={col} strokeWidth="4" strokeDasharray={`${pct/100*c} ${c}`} strokeLinecap="round" transform="rotate(-90 25 25)" style={{transition:"stroke-dasharray .6s"}}/></svg><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:11,fontWeight:700,color:"#333"}}>{pct}%</div></div>);}
function Ch({l,v,c}){return<div style={{background:"#f8f9fa",borderRadius:8,padding:"3px 10px",fontSize:10}}><span style={{color:"#aaa"}}>{l}</span> <span style={{color:c,fontWeight:600}}>{v}</span></div>;}

function Prof({p, prog, upd, go}) {
  const m=FAMILY[p];
  const menu=[
    {id:"schedule",icon:"🕐",l:"Daily Schedule",d:"When to do what — full day timeline"},
    {id:"donts",icon:"🚫",l:`DON'Ts & Safety Rules (${m.donts.length})`,d:"Critical rules — read these!"},
    {id:"exercises",icon:"🏋️",l:"Today's Exercises",d:"Workout & yoga with animated demos"},
    {id:"hydration",icon:"💧",l:"Hydration Tracker",d:"Bottle-by-bottle tracking"},
    {id:"supplements",icon:"💊",l:"Supplements & Meds",d:"Daily supplement checklist"},
    {id:"tracking",icon:"📊",l:"Progress Tracking",d:"Weight, strength, habit streaks"},
    {id:"medical",icon:"🏥",l:"Medical Actions",d:"Doctor visits & retests"},
  ];
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("dash")} style={$.back}>← Family Dashboard</button>
      <div style={{textAlign:"center",paddingBottom:14,marginBottom:12,borderBottom:`3px solid ${m.color}`}}>
        <span style={{fontSize:46}}>{m.emoji}</span>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:800,margin:"6px 0 2px",color:"#1a1a2e"}}>{m.name}</h2>
        <div style={{fontSize:12,color:"#888"}}>{m.height} · {m.weight}kg · BMI {m.bmi} · {m.diet}</div>
        <div style={{fontSize:11,color:"#aaa",marginTop:2}}>Wake: {m.wakeTime} · Exercise: {m.exerciseTime}</div>
      </div>
      <div style={{margin:"12px 0"}}><div style={$.lbl}>Goals</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.goals.map((g,i)=><span key={i} style={{fontSize:10,fontWeight:600,border:`1.5px solid ${m.color}`,color:m.color,borderRadius:20,padding:"3px 11px"}}>{g}</span>)}</div>
      </div>
      <div style={{margin:"12px 0"}}><div style={$.lbl}>Health Snapshot</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.healthIssues.map((h,i)=><div key={i} style={{background:sBg(h.s),border:`1px solid ${sCol(h.s)}22`,borderRadius:8,padding:"4px 9px",fontSize:11}}><span style={{color:"#666"}}>{h.l}:</span> <span style={{color:sCol(h.s),fontWeight:700}}>{h.v}</span></div>)}</div>
      </div>
      <div style={{marginTop:16}}>
        {menu.map(item=>(
          <button key={item.id} onClick={()=>go(item.id)} style={$.menuBtn}>
            <span style={{fontSize:22}}>{item.icon}</span>
            <div style={{flex:1,textAlign:"left"}}><div style={{fontWeight:600,color:"#1a1a2e",fontSize:14}}>{item.l}</div><div style={{fontSize:11,color:"#999"}}>{item.d}</div></div>
            <span style={{color:"#ccc",fontSize:18}}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Sched({p, go}) {
  const m=FAMILY[p], dn=dayN();
  let exT="";
  if(p==="yash"){if(["mon","wed","fri"].includes(dn))exT="💪 Strength";else if(["tue","thu"].includes(dn))exT="🧘 Yoga";else if(dn==="sat")exT="⚡ HIIT (Wk4)";else exT="🌿 Rest";}
  else{if(["mon","wed","fri"].includes(dn))exT="💪 Walk+Strength";else if(["tue","thu","sat"].includes(dn))exT="🧘 Walk+Yoga";else exT="🌿 Rest (walk only)";}
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🕐 Daily Schedule</h2>
      <div style={{fontSize:13,color:m.color,fontWeight:600,marginBottom:2}}>{dayL()} — {exT}</div>
      <div style={{fontSize:11,color:"#999",marginBottom:14}}>Your complete day, timed out</div>
      <div style={{position:"relative",paddingLeft:26}}>
        <div style={{position:"absolute",left:9,top:8,bottom:8,width:2,background:"#e8e8e8",borderRadius:1}}/>
        {m.dailySchedule.map((item,i)=>(
          <div key={i} style={{position:"relative",marginBottom:1,padding:"7px 10px",background:item.task.includes("⭐")?"#FEF3C7":item.task.includes("NON-NEGOTIABLE")?"#FEF3C7":"transparent",borderRadius:10}}>
            <div style={{position:"absolute",left:-20,top:11,width:8,height:8,borderRadius:"50%",background:item.task.includes("⭐")?m.color:item.task.includes("EXERCISE")?"#16A34A":"#ddd",border:"2px solid #fff"}}/>
            <div style={{display:"flex",gap:7,alignItems:"flex-start"}}>
              <span style={{fontSize:14}}>{item.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:m.color,fontWeight:600}}>{item.time}</div>
                <div style={{fontSize:12,color:"#333",lineHeight:1.4,marginTop:1}}>{item.task}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {p==="yash"&&<div style={{...$.tip,marginTop:14}}>🍌 <strong>Nutrition:</strong> Pre-workout snack 60–90 min before · Post-workout whey within 30–45 min · Dinner 1–1.5 hrs after shake</div>}
      {p!=="yash"&&<div style={{...$.tip,marginTop:14}}>🥜 <strong>Morning:</strong> Water + soaked almonds before walk · Breakfast within 30–45 min after exercise</div>}
    </div>
  );
}

function DontsView({p, go}) {
  const m=FAMILY[p];
  const univ=[
    {text:"NEVER hold breath during exercise — exhale on push/pull, inhale on release",icon:"🫁"},
    {text:"NO training through sharp joint pain — muscle soreness OK, joint pain = STOP",icon:"🛑"},
    {text:"NO skipping warm-up (5 min) or cool-down (5 min)",icon:"⏱️"},
    {text:"NO excess ghee cooking — triglycerides high for all 3",icon:"🧈"},
    {text:"NO sugary chai — switch to no sugar / stevia / jaggery",icon:"🍵"},
    {text:"NO skipping water — dehydration worsens kidney stones & all markers",icon:"💧"},
    {text:"NO carb-only breakfasts — MUST add protein every meal",icon:"🍳"},
  ];
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🚫 DON'Ts & Safety Rules</h2>
      <div style={{fontSize:12,color:"#DC2626",fontWeight:600,marginBottom:14}}>Read carefully. These protect your health.</div>
      <div style={{marginBottom:18}}><div style={{...$.lbl,color:m.color}}>{m.name}'s Rules ({m.donts.length})</div>
        {m.donts.map((d,i)=><div key={i} style={$.dont}><span style={{fontSize:16,flexShrink:0}}>{d.icon}</span><div style={{fontSize:12,color:"#333",lineHeight:1.5}}>{d.text}</div></div>)}
      </div>
      <div style={{marginBottom:18}}><div style={{...$.lbl,color:"#DC2626"}}>Universal Family Rules</div>
        {univ.map((d,i)=><div key={i} style={{...$.dont,background:"#FEF2F2"}}><span style={{fontSize:16,flexShrink:0}}>{d.icon}</span><div style={{fontSize:12,color:"#7F1D1D",lineHeight:1.5}}>{d.text}</div></div>)}
      </div>
      <div style={{marginBottom:18}}><div style={$.lbl}>Soreness vs Injury</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[{l:"NORMAL (DOMS)",items:["Dull ache across muscle","Peaks 24–48 hrs after","Gets better with movement","Safe to continue"],c:"#16A34A"},
            {l:"INJURY — STOP",items:["Sharp pain, specific spot","Especially joints","Gets WORSE with movement","Stop, rest, see doctor"],c:"#DC2626"}
          ].map((g,i)=><div key={i} style={{flex:"1 1 140px",background:g.c+"0D",border:`1.5px solid ${g.c}33`,borderRadius:12,padding:10}}>
            <div style={{fontWeight:700,fontSize:12,color:g.c,marginBottom:5}}>{g.l}</div>
            {g.items.map((x,j)=><div key={j} style={{fontSize:11,color:"#444",lineHeight:1.5}}>· {x}</div>)}
          </div>)}
        </div>
      </div>
      <div style={{marginBottom:18}}><div style={$.lbl}>🍽️ Diet Fixes</div>
        <div style={{background:"#FFFBEB",borderRadius:12,padding:12}}>
          {[{b:"Excess ghee",f:"1 tsp mustard/olive oil. Ghee max 1 tsp/day",w:"Everyone, esp. Savita Ji (no gallbladder)"},
            {b:"Carb-heavy breakfast",f:"Add paneer bhurji, moong chilla, sprouts, curd",w:"Everyone"},
            {b:"Sugary chai 2–3 cups",f:"No sugar/stevia. Max 1 cup",w:"Everyone, critical for Savita Ji"},
            {b:"White rice",f:"Brown rice or halve portion",w:"Everyone, critical for Savita Ji (glucose)"},
            {b:"Low protein",f:"Yash: 120–130g/day (whey). Parents: 60–70g",w:"Everyone"},
            {b:"Low water",f:"Yash/Anil: 4L. Savita: 3L. Bottle method",w:"Everyone — kidneys"}
          ].map((x,i)=><div key={i} style={{padding:"6px 0",borderBottom:i<5?"1px solid #FDE68A":"none"}}>
            <div style={{fontSize:11}}><span style={{color:"#DC2626",fontWeight:700}}>✗ {x.b}</span></div>
            <div style={{fontSize:11,color:"#166534",marginTop:1}}>✓ {x.f}</div>
            <div style={{fontSize:9,color:"#999"}}>→ {x.w}</div>
          </div>)}
        </div>
      </div>
      <div><div style={$.lbl}>📅 Timeline — What to Expect</div>
        <div style={{background:"#F0FDF4",borderRadius:12,padding:12}}>
          {[{w:"Week 1–2",n:"Sore, possibly tired. NORMAL. Don't quit.",c:"#F59E0B"},
            {w:"Week 3–4",n:"Energy up, soreness down, feeling stronger.",c:"#22C55E"},
            {w:"Week 5–8",n:"Clothes fit different, face leaner, strength up.",c:"#3B82F6"},
            {w:"Week 9–12",n:"Visible changes. Triglycerides should drop at retest.",c:"#8B5CF6"}
          ].map((x,i)=><div key={i} style={{display:"flex",gap:8,padding:"4px 0",alignItems:"flex-start"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:x.c,marginTop:4,flexShrink:0}}/>
            <div><span style={{fontWeight:700,fontSize:11,color:x.c}}>{x.w}:</span> <span style={{fontSize:11,color:"#333"}}>{x.n}</span></div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

function Exer({p, prog, upd, go, currentWeek, setCurrentWeek}) {
  const td=todayKey(), m=FAMILY[p];
  const [expanded, setExpanded]=useState(null);
  const [previewDay, setPreviewDay] = useState(null); // null = today
  const wk = currentWeek;
  const setWk = setCurrentWeek;

  // Determine which day to show exercises for
  const activeDayCode = previewDay || dayN();
  const activeDayLabel = previewDay
    ? ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][["sun","mon","tue","wed","thu","fri","sat"].indexOf(previewDay)]
    : dayL();
  const isPreview = previewDay !== null;

  const comp = isPreview ? [] : (prog.exercises?.[td]?.completed||[]);
  const tog=(i)=>{
    if (isPreview) return; // no toggling in preview mode
    const n=comp.includes(i)?comp.filter(x=>x!==i):[...comp,i];
    upd(p,"exercises",td,{completed:n,wk});
  };

  // Build exercise list for the active day
  const dn = activeDayCode;
  let exs=[],exT="",wu=null,cd=null;
  if(p==="yash"){
    if(["mon","wed","fri"].includes(dn)){
      exT="Strength Training"; wu=YASH_WARMUP; cd=YASH_COOLDOWN;
      const wd=EX.yash.str[wk]||EX.yash.str["week1-2"];let d=wd[dn];if(d==="mon")d=wd["mon"];exs=d||[];
    }else if(["tue","thu"].includes(dn)){
      exT="Yoga";const yw=wk==="week1-2"?"week1-2":"week3-4";
      exs=(EX.yash.yoga[yw]||[]).map(y=>({n:y.n,s:1,r:y.d,e:y.desc}));
    }else if(dn==="sat"&&wk==="week4"){
      exT="HIIT (15 min)";wu=YASH_WARMUP;cd=YASH_COOLDOWN;exs=EX.yash.str["week4"]?.sat||[];
    }else exT="Rest Day 🌿";
  }else{
    const pk=p==="anil"?"f":"m";
    if(["mon","wed","fri"].includes(dn)){
      exT="Walk + Strength";const wd=EX.parents.str[wk]||EX.parents.str["week1-2"];
      exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"},...(wd[pk]||[])];
    }else if(["tue","thu","sat"].includes(dn)){
      exT="Walk + Yoga";const yw=wk==="week1-2"?"week1-2":"week3-4";
      exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"},...(EX.parents.yoga[yw]||[]).map(y=>({n:y.n,s:1,r:y.d,e:y.desc}))];
    }else{exT="Rest Day (walk only)";exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"}];}
  }

  // Progress bar
  const totalEx = exs.length;
  const doneCount = comp.length;
  const pct = totalEx > 0 ? Math.round(doneCount / totalEx * 100) : 0;
  const allDone = totalEx > 0 && doneCount >= totalEx;

  // Mark all / unmark all
  const markAll = () => {
    if (isPreview) return;
    if (allDone) {
      upd(p, "exercises", td, { completed: [], wk });
    } else {
      upd(p, "exercises", td, { completed: Array.from({ length: totalEx }, (_, i) => i), wk });
    }
  };

  const hab=prog.habits?.[td]||{};
  const togH=(id)=>upd(p,"habits",td,{...hab,[id]:!hab[id]});
  const sp=p==="yash"?[{id:"family_walk",l:"Family post-dinner walk (10–15 min)"}]:
    p==="anil"?[{id:"pranayama",l:"🧘 Pranayama — Anulom Vilom (5 min)"},{id:"family_walk",l:"Family walk (10–15 min)"}]:
    [{id:"post_dinner_walk",l:"⭐ Post-dinner walk 10 min — NON-NEGOTIABLE"},{id:"calf_routine",l:"🦵 Calf cramp routine (3 min)"},{id:"family_walk",l:"Family walk (10–15 min)"}];

  const DAY_BTNS = [
    {k:"mon",l:"M"},{k:"tue",l:"T"},{k:"wed",l:"W"},{k:"thu",l:"Th"},{k:"fri",l:"F"},{k:"sat",l:"Sa"},{k:"sun",l:"Su"}
  ];

  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🏋️ {isPreview ? `${activeDayLabel} Preview` : "Today's Exercises"}</h2>
      <div style={{fontSize:13,color:m.color,fontWeight:600,marginBottom:2}}>{activeDayLabel} — {exT}</div>
      <div style={{fontSize:10,color:"#999",marginBottom:4}}>Rest 60–90 sec between sets</div>
      <div style={{fontSize:10,color:"#64748b",marginBottom:8,fontStyle:"italic"}}>Tap any exercise to see animated form demo →</div>

      {/* Day Preview Selector */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Preview Day</div>
        <div style={{display:"flex",gap:3}}>
          <button onClick={()=>setPreviewDay(null)} style={{...$.dayBtn,background:!previewDay?m.color:"#f0f0f0",color:!previewDay?"#fff":"#666",fontWeight:!previewDay?700:500}}>Today</button>
          {DAY_BTNS.map(d=>{
            const isActive = previewDay===d.k;
            const isToday = !previewDay && dayN()===d.k;
            return <button key={d.k} onClick={()=>setPreviewDay(d.k===dayN()?null:d.k)} style={{...$.dayBtn,background:isActive?m.color:isToday?"#fff":"#f0f0f0",color:isActive?"#fff":"#666",border:isToday&&!isActive?`1.5px solid ${m.color}`:"1.5px solid transparent",fontWeight:isActive||isToday?700:500}}>{d.l}</button>;
          })}
        </div>
      </div>

      {/* Week Selector */}
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        {["week1-2","week3","week4"].map(w=><button key={w} onClick={()=>setWk(w)} style={{...$.wkBtn,background:wk===w?m.color:"#f0f0f0",color:wk===w?"#fff":"#666"}}>{w==="week1-2"?"Wk 1–2":w==="week3"?"Wk 3":"Wk 4"}</button>)}
        <span style={{fontSize:9,color:"#aaa",marginLeft:4}}>auto-detected</span>
      </div>

      {/* Progress Bar */}
      {!isPreview && totalEx > 0 && !exT.includes("Rest") && (
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:11,fontWeight:600,color:allDone?"#16A34A":"#555"}}>{allDone?"🎉 All done!": `${doneCount}/${totalEx} exercises`}</span>
            <button onClick={markAll} style={{background:"none",border:`1.5px solid ${allDone?"#DC2626":m.color}`,borderRadius:8,padding:"3px 10px",fontSize:10,fontWeight:600,color:allDone?"#DC2626":m.color,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{allDone?"Unmark all":"✓ Mark all done"}</button>
          </div>
          <div style={{height:6,background:"#f0f0f0",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:allDone?"#16A34A":m.color,borderRadius:3,transition:"width .4s ease"}}/>
          </div>
        </div>
      )}

      {isPreview && <div style={{background:"#EFF6FF",borderRadius:10,padding:"7px 12px",fontSize:11,color:"#1e40af",marginBottom:10}}>👀 Preview mode — showing {activeDayLabel}'s workout. Tap "Today" to go back.</div>}

      {p==="anil"&&<div style={$.warn}>⚠️ <strong>BP:</strong> No heavy overhead · Breathe always · Water nearby · Sit if dizzy · Cilacar taken?</div>}
      {p==="savita"&&<div style={$.warn}>⚠️ No jumping · Slow & controlled · Chair for balance · Seated-only if knee pain</div>}
      {p==="yash"&&wu&&<div style={{...$.tip,marginBottom:10}}>🔥 <strong>Warm-up (5 min):</strong> {wu.join(" → ")}</div>}

      {exs.length===0&&exT.includes("Rest")?<div style={{padding:20,textAlign:"center",color:"#999"}}>Rest day! Stretch if you feel like it 🌿</div>:
        exs.map((ex,i)=>(
          <div key={i} style={{marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:0}}>
              <button onClick={(e)=>{e.stopPropagation();tog(i);}} style={{...$.chk,background:comp.includes(i)?"#16A34A":"#fff",borderColor:comp.includes(i)?"#16A34A":"#ddd",color:"#fff",flexShrink:0,cursor:"pointer",margin:"0 10px 0 0",opacity:isPreview?0.4:1}}>{comp.includes(i)&&"✓"}</button>
              <button onClick={()=>setExpanded(expanded===i?null:i)} style={{...$.exI,flex:1,margin:0,background:comp.includes(i)?"#F0FDF4":expanded===i?"#f8fafc":"#fff",borderColor:comp.includes(i)?"#86EFAC":expanded===i?m.color+"66":"#eee"}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:12,color:comp.includes(i)?"#16A34A":"#1a1a2e",textDecoration:comp.includes(i)?"line-through":"none"}}>{ex.n}</div>
                  <div style={{fontSize:10,color:"#999",marginTop:1}}>{ex.s&&ex.r?`${ex.s}×${ex.r}`:""}{ex.e?` · ${ex.e}`:""}</div>
                </div>
                <span style={{fontSize:10,color:m.color,fontWeight:600,opacity:0.7}}>{expanded===i?"▲":"▼"}</span>
              </button>
            </div>
            {expanded===i&&(
              <div className="vis-expand" style={{background:"#fff",border:`1.5px solid ${m.color}22`,borderRadius:"0 0 12px 12px",marginTop:-2,padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:160,height:120}}>
                  <ExVis name={ex.n} playing={true} />
                </div>
                <div style={{fontSize:10,color:"#64748b",marginTop:6,textAlign:"center",lineHeight:1.5}}>
                  {ex.e && <span>💡 {ex.e}</span>}
                  {ex.s&&ex.r&&<span style={{marginLeft:8}}>• {ex.s} sets × {ex.r}</span>}
                </div>
                {getYouTubeId(ex.n) && (
                  <div style={{width:"100%",marginTop:10}}>
                    <div style={{fontSize:10,fontWeight:600,color:m.color,marginBottom:4,textAlign:"center"}}>📺 Watch Tutorial</div>
                    <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:10,overflow:"hidden",background:"#000"}}>
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(ex.n)}?rel=0&modestbranding=1`}
                        style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${ex.n} tutorial`}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

      {p==="yash"&&cd&&!exT.includes("Rest")&&!exT.includes("Yoga")&&<div style={{...$.tip,marginTop:10}}>🧊 <strong>Cool-down (5 min):</strong> {cd.join(" → ")}</div>}

      {!isPreview && (
        <div style={{marginTop:16}}><div style={$.lbl}>Daily Habits</div>
          {sp.map(h=>{
            const isP = h.id === "pranayama";
            return (
              <div key={h.id} style={{marginBottom:4}}>
                <button onClick={()=>{if(isP){setExpanded(expanded==="pranayama"?null:"pranayama")}else{togH(h.id)}}} style={{...$.exI,background:hab[h.id]?"#F0FDF4":"#fff",borderColor:hab[h.id]?"#86EFAC":"#eee",marginBottom:0}}>
                  <div onClick={(e)=>{if(isP){e.stopPropagation();togH(h.id);}}} style={{...$.chk,background:hab[h.id]?"#16A34A":"#fff",borderColor:hab[h.id]?"#16A34A":"#ddd",color:"#fff"}}>{hab[h.id]&&"✓"}</div>
                  <div style={{fontSize:12,fontWeight:500,color:hab[h.id]?"#16A34A":"#333",flex:1}}>{h.l}</div>
                  {isP && <span style={{fontSize:10,color:m.color,fontWeight:600,opacity:0.7,padding:"4px 8px"}}>{expanded==="pranayama"?"▲":"▼"}</span>}
                </button>
                {isP && expanded==="pranayama" && (
                  <div className="vis-expand" style={{background:"#fff",border:`1.5px solid ${m.color}22`,borderRadius:"0 0 12px 12px",marginTop:-2,padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:140,height:110}}>
                      <PranayamaVis playing={true} />
                    </div>
                    <div style={{width:"100%",marginTop:10}}>
                      <div style={{fontSize:10,fontWeight:600,color:m.color,marginBottom:4,textAlign:"center"}}>📺 Watch Tutorial</div>
                      <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:10,overflow:"hidden",background:"#000"}}>
                        <iframe
                          src="https://www.youtube.com/embed/8VwufJrUhxk?rel=0&modestbranding=1"
                          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Anulom Vilom tutorial"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {p==="savita"&&<div style={{...$.tip,marginTop:10}}><strong>Calf Routine:</strong> Ankle circles 10 each → Point/flex 15 → Calf stretch 20s each leg</div>}
      {p==="anil"&&<div style={{...$.tip,marginTop:10}}><strong>Anulom Vilom:</strong> Close right (thumb) → inhale left → Close left (ring) → exhale right → Inhale right → close → exhale left = 1 cycle. 5 min, slow & steady.</div>}
    </div>
  );
}

function Hydra({p, prog, upd, go}) {
  const td=todayKey(), m=FAMILY[p], hyd=prog.hydration?.[td]||{bottles:0}, tgt=m.hydrationTarget;
  const setB=(n)=>upd(p,"hydration",td,{bottles:n});
  const tl=["Morning","Before lunch","Before chai","Before dinner"];
  const hist=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"short"}),b:prog.hydration?.[k]?.bottles||0,t:i===6};});
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>💧 Hydration Tracker</h2>
      <div style={{fontSize:13,color:"#555"}}>Target: <strong>{tgt}L</strong></div>
      <div style={{fontSize:11,color:m.color,fontWeight:500,marginBottom:14}}>{m.hydrationTip}</div>
      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        {Array.from({length:tgt},(_,i)=><button key={i} onClick={()=>setB(i+1===hyd.bottles?i:i+1)} style={{...$.bot,background:i<hyd.bottles?"#DBEAFE":"#f8f8f8",borderColor:i<hyd.bottles?"#3B82F6":"#e0e0e0"}}>
          <div style={{fontSize:32,opacity:i<hyd.bottles?1:.3}}>{i<hyd.bottles?"💧":"🫗"}</div>
          <div style={{fontSize:11,fontWeight:600,color:i<hyd.bottles?"#2563EB":"#bbb",marginTop:2}}>{i+1}L</div>
          <div style={{fontSize:8,color:"#bbb"}}>{tl[i]}</div>
        </button>)}
      </div>
      <div style={{textAlign:"center",marginBottom:14}}>
        <span style={{fontSize:42,fontWeight:800,fontFamily:"'Fraunces',serif",color:hyd.bottles>=tgt?"#16A34A":"#3B82F6"}}>{hyd.bottles||0}</span>
        <span style={{fontSize:18,color:"#999"}}> / {tgt}L</span>
        {hyd.bottles>=tgt&&<div style={{color:"#16A34A",fontSize:12,marginTop:2}}>🎉 Target reached!</div>}
      </div>
      <div style={{background:"#F0F9FF",borderRadius:12,padding:12,marginBottom:10,fontSize:11,color:"#555",lineHeight:1.7}}>
        <div style={{fontWeight:700,color:"#1E40AF",marginBottom:4}}>Schedule</div>
        <div>🫗 <strong>1:</strong> 1 glass on waking → finish before breakfast</div>
        <div>🫗 <strong>2:</strong> Finish before lunch</div>
        <div>🫗 <strong>3:</strong> Finish before evening chai</div>
        {tgt>=4&&<div>🫗 <strong>4:</strong> Before dinner. Reduce after 8:30 PM</div>}
        <div style={{marginTop:4,color:"#CA8A04"}}>☕ After every chai → 1 glass water</div>
      </div>
      <div style={{...$.tip,marginBottom:14}}>Ramp-up: Wk1 → 2L · Wk2 → 3L · Wk3+ → Full {tgt}L</div>
      <div style={$.lbl}>This Week</div>
      <div style={{display:"flex",gap:3}}>
        {hist.map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:45,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{width:"65%",borderRadius:"3px 3px 0 0",height:`${Math.max(d.b/tgt*100,4)}%`,background:d.b>=tgt?"#3B82F6":d.b>0?"#93C5FD":"#eee",transition:"height .3s"}}/></div>
          <div style={{fontSize:8,color:d.t?"#3B82F6":"#999",fontWeight:d.t?700:400,marginTop:2}}>{d.l}</div></div>)}
      </div>
    </div>
  );
}

function Supps({p, prog, upd, go}) {
  const td=todayKey(), m=FAMILY[p], sup=prog.supplements?.[td]||{taken:[]};
  const tog=(i)=>{const n=sup.taken.includes(i)?sup.taken.filter(x=>x!==i):[...sup.taken,i];upd(p,"supplements",td,{taken:n});};
  const sL={taking:"Taking ✓",start:"Start!",buy:"Buy!",insufficient:"INSUFFICIENT",switch:"Switch!"};
  const hist=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"short"}),n:prog.supplements?.[k]?.taken?.length||0,t:i===6};});
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>💊 Supplements & Meds</h2>
      {m.supplements.map((s,i)=><button key={i} onClick={()=>tog(i)} style={{...$.exI,background:sup.taken.includes(i)?"#F0FDF4":"#fff",borderColor:sup.taken.includes(i)?"#86EFAC":"#eee"}}>
        <div style={{...$.chk,background:sup.taken.includes(i)?"#16A34A":"#fff",borderColor:sup.taken.includes(i)?"#16A34A":"#ddd",color:"#fff"}}>{sup.taken.includes(i)&&"✓"}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:600,fontSize:12,color:"#1a1a2e"}}>{s.icon} {s.name}</div>
          <div style={{fontSize:10,color:"#999",marginTop:1}}>{s.freq}</div>
          <div style={{fontSize:10,color:m.color,marginTop:1}}>⏰ {s.when}</div>
        </div>
        <span style={{fontSize:8,fontWeight:700,color:sCol(s.status),background:sBg(s.status),padding:"2px 7px",borderRadius:5,textTransform:"uppercase",whiteSpace:"nowrap"}}>{sL[s.status]||s.status}</span>
      </button>)}
      {p==="anil"&&<div style={{...$.warn,marginTop:10}}>⚠️ <strong>Neurobion Forte only has 15mcg B12.</strong> Your B12 is 107 (CRITICAL). Need 1500mcg methylcobalamin or injections. Ask doctor.</div>}
      <div style={{marginTop:14}}><div style={$.lbl}>This Week</div>
        <div style={{display:"flex",gap:4}}>{hist.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"4px 0",borderRadius:6,background:d.n>=m.supplements.length?"#F0FDF4":d.n>0?"#FFFBEB":"#f8f8f8"}}>
          <div style={{fontSize:13}}>{d.n>=m.supplements.length?"✅":d.n>0?"🟡":"⬜"}</div>
          <div style={{fontSize:7,color:d.t?"#16A34A":"#999"}}>{d.l}</div>
        </div>)}</div>
      </div>
    </div>
  );
}

function Track({p, prog, upd, go}) {
  const m=FAMILY[p], td=todayKey(), met=prog.metrics||{};
  const [wi,setWi]=useState(""), [mi,setMi]=useState({});
  const logW=()=>{const w=parseFloat(wi);if(!isNaN(w)&&w>20&&w<200){upd(p,"metrics",td,{...met[td],weight:w});setWi("");}};
  const logM=(k)=>{const v=parseFloat(mi[k]);if(!isNaN(v)){upd(p,"metrics",td,{...met[td],[k]:v});setMi(pr=>({...pr,[k]:""}));}};
  const mF=p==="yash"?[{k:"pushups",l:"Push-ups (max)",i:"💪"},{k:"plank",l:"Plank (sec)",i:"🧘"},{k:"deadhang",l:"Dead hang (sec)",i:"🏋️"}]
    :[{k:"wallpushups",l:"Wall push-ups",i:"💪"},{k:"sittostand",l:"Sit-to-stand",i:"🪑"}];
  const wh=[];for(let i=29;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);if(met[k]?.weight)wh.push({dt:d.toLocaleDateString("en-IN",{day:"numeric",month:"short"}),w:met[k].weight});}
  const wT=p==="yash"?"73–75 kg":p==="anil"?"78 kg":"74–75 kg";
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>📊 Progress Tracking</h2>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>⚖️ Weight Log</div>
        <div style={{fontSize:10,color:"#999",marginBottom:6}}>Every Sunday morning, before eating. Target: <strong style={{color:m.color}}>{wT}</strong></div>
        <div style={{display:"flex",gap:6}}><input type="number" placeholder="kg" value={wi} onChange={e=>setWi(e.target.value)} style={$.inp}/>
          <button onClick={logW} style={{...$.logB,background:m.color}}>Log</button></div>
        {met[td]?.weight&&<div style={{fontSize:11,color:"#16A34A",marginTop:4}}>Today: {met[td].weight}kg ✓</div>}
        {wh.length>1&&<div style={{marginTop:12}}>
          <div style={{fontSize:9,color:"#888",marginBottom:3}}>Trend (30d)</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:1,height:50}}>
            {wh.map((w,i)=>{const mn=Math.min(...wh.map(x=>x.w)),mx=Math.max(...wh.map(x=>x.w)),rg=mx-mn||1;
              return<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{fontSize:6,color:"#999"}}>{w.w}</div>
                <div style={{width:"80%",height:((w.w-mn)/rg)*35+8,background:m.color,borderRadius:"2px 2px 0 0",opacity:.7}}/>
              </div>;})}
          </div>
        </div>}
      </div>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>🏋️ Exercise Milestones</div>
        {mF.map(f=><div key={f.k} style={{marginBottom:10}}>
          <div style={{fontSize:11,color:"#555",marginBottom:3}}>{f.i} {f.l}</div>
          <div style={{display:"flex",gap:6}}><input type="number" placeholder="#" value={mi[f.k]||""} onChange={e=>setMi(pr=>({...pr,[f.k]:e.target.value}))} style={$.inp}/>
            <button onClick={()=>logM(f.k)} style={{...$.logB,background:m.color}}>Log</button></div>
          {met[td]?.[f.k]&&<div style={{fontSize:10,color:"#16A34A",marginTop:3}}>Today: {met[td][f.k]} ✓</div>}
          <div style={{display:"flex",gap:3,marginTop:4}}>{Array.from({length:7}).map((_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);const v=met[k]?.[f.k];
            return<div key={i} style={{flex:1,textAlign:"center",fontSize:9,padding:"2px 0",background:v?"#F0FDF4":"#f8f8f8",borderRadius:3}}>{v||"—"}</div>;})}</div>
        </div>)}
      </div>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>🔥 Habit Streaks</div>
        {p==="savita"&&<HR l="⭐ Post-dinner walk" hk="post_dinner_walk" prog={prog}/>}
        {p==="savita"&&<HR l="🦵 Calf routine" hk="calf_routine" prog={prog}/>}
        {p==="anil"&&<HR l="🧘 Pranayama" hk="pranayama" prog={prog}/>}
        <HR l="🚶 Family walk" hk="family_walk" prog={prog}/>
      </div>
    </div>
  );
}
function HR({l,hk,prog}){
  const ds=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"narrow"}),dn:prog.habits?.[k]?.[hk],t:i===6};});
  let sk=0;for(let i=ds.length-1;i>=0;i--){if(ds[i].dn)sk++;else break;}
  return<div style={{marginBottom:8}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
      <span style={{fontSize:11,color:"#555"}}>{l}</span>
      {sk>0&&<span style={{fontSize:9,color:"#EA580C",fontWeight:700}}>🔥{sk}d</span>}
    </div>
    <div style={{display:"flex",gap:2}}>{ds.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"3px 0",borderRadius:4,background:d.dn?"#F0FDF4":"#f8f8f8",border:d.t?"1.5px solid #16A34A":"1px solid transparent"}}>
      <div style={{fontSize:11}}>{d.dn?"✅":"⬜"}</div><div style={{fontSize:7,color:"#999"}}>{d.l}</div></div>)}</div>
  </div>;
}

function Med({p, prog, upd, go}) {
  const m=FAMILY[p], md=prog.habits?.medical||{};
  const togM=(i)=>upd(p,"habits","medical",{...md,[`m${i}`]:!md[`m${i}`]});
  const rt={yash:["Lipid profile (triglycerides)","Urine routine (oxalate crystals)","Serum ferritin","Vitamin D, B12, CBC"],
    anil:["Vitamin B12 (improve from 107)","Lipid profile","Urine routine","Kidney stone ultrasound","Vitamin D, CBC"],
    savita:["HbA1c (improve from 6.90%)","Fasting glucose","Urine microalbumin","Lipid profile","Serum ferritin","Vitamin D, B12, CBC"]};
  const wt={yash:"80 → 73–75 kg",anil:"83 → 78 kg",savita:"80 → 74–75 kg"};
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🏥 Medical Actions</h2>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#DC2626"}}>Pending Doctor Visits</div>
        {m.medicalActions.map((a,i)=><button key={i} onClick={()=>togM(i)} style={{...$.exI,background:md[`m${i}`]?"#F0FDF4":"#FEF2F2",borderColor:md[`m${i}`]?"#86EFAC":"#FECACA"}}>
          <div style={{...$.chk,background:md[`m${i}`]?"#16A34A":"#fff",borderColor:md[`m${i}`]?"#16A34A":"#ddd",color:"#fff"}}>{md[`m${i}`]&&"✓"}</div>
          <div style={{fontSize:11,color:md[`m${i}`]?"#16A34A":"#555",fontWeight:500,textDecoration:md[`m${i}`]?"line-through":"none"}}>{a}</div>
        </button>)}
      </div>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#2563EB"}}>3-Month Retests</div>
        <div style={{background:"#EFF6FF",borderRadius:12,padding:12,fontSize:11,color:"#555",lineHeight:1.7}}>{rt[p].map((t,i)=><div key={i}>• {t}</div>)}</div>
      </div>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#7C3AED"}}>6-Month Weight Target</div>
        <div style={{background:"#F5F3FF",borderRadius:12,padding:12,fontSize:13,color:"#555"}}>Current → Target: <strong style={{color:m.color}}>{wt[p]}</strong></div>
      </div>
      <div><div style={{...$.lbl,color:"#16A34A"}}>6-Month Full Panel</div>
        <div style={{background:"#F0FDF4",borderRadius:12,padding:12,fontSize:11,color:"#555",lineHeight:1.7}}>
          <div>• Full blood panel all 3 members</div>{p==="savita"&&<div>• DEXA scan if not done</div>}<div>• Compare all markers to baseline</div></div>
      </div>
    </div>
  );
}

const $={
  app:{fontFamily:"'Outfit',sans-serif",background:"linear-gradient(170deg,#FAFAF9 0%,#F5F0E8 50%,#EDE8DD 100%)",minHeight:"100vh",color:"#1a1a2e"},
  cen:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"},
  scr:{maxWidth:480,margin:"0 auto",padding:"14px 14px 36px"},
  back:{background:"#fff",border:"1.5px solid #e5e5e5",fontSize:15,fontWeight:600,color:"#555",cursor:"pointer",padding:"10px 18px",fontFamily:"'Outfit',sans-serif",borderRadius:12,marginBottom:4,boxShadow:"0 1px 2px rgba(0,0,0,.04)"},
  sec:{fontFamily:"'Fraunces',serif",fontSize:21,fontWeight:700,margin:"4px 0 8px",color:"#1a1a2e"},
  lbl:{fontSize:10,fontWeight:600,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6},
  card:{width:"100%",background:"#fff",borderRadius:14,padding:"14px 16px",border:"none",cursor:"pointer",textAlign:"left",marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
  menuBtn:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 13px",background:"#fff",border:"1px solid #eee",borderRadius:12,cursor:"pointer",marginBottom:6,fontFamily:"'Outfit',sans-serif",textAlign:"left"},
  wkBtn:{border:"none",borderRadius:8,padding:"5px 13px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
  exI:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 11px",border:"1.5px solid #eee",borderRadius:10,cursor:"pointer",marginBottom:0,background:"#fff",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
  chk:{width:20,height:20,borderRadius:5,border:"2px solid #ddd",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0},
  warn:{background:"#FEF2F2",borderRadius:10,padding:"9px 12px",fontSize:11,color:"#991B1B",marginBottom:10,lineHeight:1.5},
  tip:{background:"#FFFBEB",borderRadius:10,padding:"9px 12px",fontSize:11,color:"#92400E",lineHeight:1.6},
  dont:{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 10px",background:"#fff",border:"1.5px solid #FCA5A5",borderRadius:10,marginBottom:4},
  bot:{border:"2px solid #e0e0e0",borderRadius:14,padding:"10px 6px",cursor:"pointer",background:"#f8f8f8",width:75,textAlign:"center",fontFamily:"'Outfit',sans-serif",transition:"all .2s"},
  tCard:{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
  inp:{flex:1,padding:"6px 10px",border:"1.5px solid #ddd",borderRadius:8,fontSize:13,fontFamily:"'Outfit',sans-serif",outline:"none"},
  logB:{border:"none",color:"#fff",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
  dayBtn:{border:"1.5px solid transparent",borderRadius:8,padding:"5px 8px",fontSize:10,fontWeight:500,cursor:"pointer",fontFamily:"'Outfit',sans-serif",minWidth:28,textAlign:"center"},
};
