import type { CaseId, ChannelId, StepState } from './model'

export interface Wording {
  title: string
  steps: { livraison: string; traitement: string; parametrage: string }
  channels: Record<ChannelId, string>
  states: Record<StepState, string>
  /** Message sous le chemin. `{date}` est remplacé par la date fournie au composant. */
  messages: Partial<Record<CaseId, string>>
}

// Wording destiné aux rédacteurs (Atlas). Messages repris à l'identique du sidepanel Qualipo
// pour l'instant : une table par public pourra être ajoutée ici.
export const WORDING: Wording = {
  title: 'Livraison du son',
  steps: {
    livraison: 'Livraison Itema',
    traitement: 'Traitement numérique',
    parametrage: 'Distribution Atlas',
  },
  channels: { web: 'Web', app: 'App', rss: 'RSS' },
  states: { done: 'validé', error: 'en erreur', scheduled: 'programmé', pending: 'en attente' },
  messages: {
    doublons: "Deux sons ou plus ont été livrés. Choisissez le son à conserver : l'épisode sera republié et les autres sons seront automatiquement désactivés.",
    doublon_nouveau: "Un nouveau son a été livré. Choisissez le son à conserver : l'épisode sera automatiquement republié.",
    remplacement_en_cours: "Un nouveau son a été livré, l'épisode est en cours de republication.",
    mid_non_conforme: "Le son ne peut être diffusé car le numéro de Magnétothèque (MID) n'est pas valide. Veuillez vérifier et corriger le MID dans Itema.",
    droits_fermes: 'Le son ne peut être diffusé car les droits sont fermés. Pour permettre la diffusion, veuillez modifier les droits dans Itema.',
    liberation_programmee: 'La date de mise à disposition du son est programmée au {date}.',
  },
}
