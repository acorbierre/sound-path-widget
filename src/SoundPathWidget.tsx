import { Fragment, type CSSProperties } from 'react'
import type { ChannelId, SoundPathDiagnostic, StepState } from './model'
import { WORDING, type Wording } from './wording'
import {
  IconArrowsSplit2, IconCalendar, IconCheck, IconUpload, IconVolume2, IconWaveSine, IconX,
  type WidgetIcon,
} from './icons'
import './sound-path-widget.css'

interface Props {
  diagnostic: SoundPathDiagnostic
  wording?: Wording
  /** Valeur de `{date}` dans le message (cas « libération programmée »). */
  date?: string
}

const STATE_ICON: Record<Exclude<StepState, 'pending'>, WidgetIcon> = {
  done: IconCheck,
  error: IconX,
  scheduled: IconCalendar,
}

function Bullet({ state, icon: Icon, label, style }: { state: StepState; icon: WidgetIcon; label: string; style: CSSProperties }) {
  const StateIcon = state === 'pending' ? Icon : STATE_ICON[state]
  return (
    <div className={`spw-bullet spw-state-${state}`} style={style} role="img" aria-label={label}>
      <StateIcon />
    </div>
  )
}

const CHANNEL_ROW: Record<ChannelId, number> = { web: 1, app: 3, rss: 5 }

export function SoundPathWidget({ diagnostic, wording = WORDING, date = '' }: Props) {
  const { steps, channels } = diagnostic
  const message = wording.messages[diagnostic.case]?.replace('{date}', date)
  const messageState: StepState = diagnostic.case === 'liberation_programmee' ? 'scheduled' : 'error'

  const main = [
    { id: 'livraison',   state: steps.livraison,   icon: IconUpload,       label: wording.steps.livraison },
    { id: 'traitement',  state: steps.traitement,  icon: IconWaveSine,     label: wording.steps.traitement },
    { id: 'parametrage', state: steps.parametrage, icon: IconArrowsSplit2, label: wording.steps.parametrage },
  ] as const

  return (
    <div className="spw-card">
      <div className="spw-title">{wording.title}</div>
      <div className="spw-body">
        <div className="spw-path">
          {main.map((step, i) => {
            const col = 1 + i * 2
            return (
              <Fragment key={step.id}>
                <Bullet state={step.state} icon={step.icon} label={`${step.label} : ${wording.states[step.state]}`} style={{ gridColumn: col, gridRow: 3 }} />
                <div className={`spw-line spw-state-${step.state}`} style={{ gridColumn: col + 1, gridRow: 3 }} />
                <div className="spw-label" style={{ gridColumn: `${col} / span 2`, gridRow: 4 }}>{step.label}</div>
              </Fragment>
            )
          })}

          <div className={`spw-branch spw-branch-up spw-state-${steps.parametrage}`} />
          <div className={`spw-branch spw-branch-down spw-state-${steps.parametrage}`} />

          {(Object.keys(channels) as ChannelId[]).map(id => (
            <Fragment key={id}>
              <Bullet state={channels[id]} icon={IconVolume2} label={`${wording.channels[id]} : ${wording.states[channels[id]]}`} style={{ gridColumn: 7, gridRow: CHANNEL_ROW[id] }} />
              <div className="spw-label" style={{ gridColumn: 7, gridRow: CHANNEL_ROW[id] + 1 }}>{wording.channels[id]}</div>
            </Fragment>
          ))}
        </div>

        {message && <p className={`spw-message spw-state-${messageState}`}>{message}</p>}
      </div>
    </div>
  )
}
