import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { WORDING } from './wording';
import { IconArrowsSplit2, IconCalendar, IconCheck, IconUpload, IconVolume2, IconWaveSine, IconX, } from './icons';
import './sound-path-widget.css';
const STATE_ICON = {
    done: IconCheck,
    error: IconX,
    scheduled: IconCalendar,
};
function Bullet({ state, icon: Icon, label, style }) {
    const StateIcon = state === 'pending' ? Icon : STATE_ICON[state];
    return (_jsx("div", { className: `spw-bullet spw-state-${state}`, style: style, role: "img", "aria-label": label, children: _jsx(StateIcon, {}) }));
}
const CHANNEL_ROW = { web: 1, app: 3, rss: 5 };
export function SoundPathWidget({ diagnostic, wording = WORDING, date = '' }) {
    const { steps, channels } = diagnostic;
    const message = wording.messages[diagnostic.case]?.replace('{date}', date);
    const messageState = diagnostic.case === 'liberation_programmee' ? 'scheduled' : 'error';
    const main = [
        { id: 'livraison', state: steps.livraison, icon: IconUpload, label: wording.steps.livraison },
        { id: 'traitement', state: steps.traitement, icon: IconWaveSine, label: wording.steps.traitement },
        { id: 'parametrage', state: steps.parametrage, icon: IconArrowsSplit2, label: wording.steps.parametrage },
    ];
    return (_jsxs("div", { className: "spw-card", children: [_jsx("div", { className: "spw-title", children: wording.title }), _jsxs("div", { className: "spw-body", children: [_jsxs("div", { className: "spw-path", children: [main.map((step, i) => {
                                const col = 1 + i * 2;
                                return (_jsxs(Fragment, { children: [_jsx(Bullet, { state: step.state, icon: step.icon, label: `${step.label} : ${wording.states[step.state]}`, style: { gridColumn: col, gridRow: 3 } }), _jsx("div", { className: `spw-line spw-state-${step.state}`, style: { gridColumn: col + 1, gridRow: 3 } }), _jsx("div", { className: "spw-label", style: { gridColumn: `${col} / span 2`, gridRow: 4 }, children: step.label })] }, step.id));
                            }), _jsx("div", { className: `spw-branch spw-branch-up spw-state-${steps.parametrage}` }), _jsx("div", { className: `spw-branch spw-branch-down spw-state-${steps.parametrage}` }), Object.keys(channels).map(id => (_jsxs(Fragment, { children: [_jsx(Bullet, { state: channels[id], icon: IconVolume2, label: `${wording.channels[id]} : ${wording.states[channels[id]]}`, style: { gridColumn: 7, gridRow: CHANNEL_ROW[id] } }), _jsx("div", { className: "spw-label", style: { gridColumn: 7, gridRow: CHANNEL_ROW[id] + 1 }, children: wording.channels[id] })] }, id)))] }), message && _jsx("p", { className: `spw-message spw-state-${messageState}`, children: message })] })] }));
}
