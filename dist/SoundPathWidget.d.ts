import type { SoundPathDiagnostic } from './model';
import { type Wording } from './wording';
import './sound-path-widget.css';
interface Props {
    diagnostic: SoundPathDiagnostic;
    wording?: Wording;
    /** Valeur de `{date}` dans le message (cas « libération programmée »). */
    date?: string;
}
export declare function SoundPathWidget({ diagnostic, wording, date }: Props): import("react").JSX.Element;
export {};
