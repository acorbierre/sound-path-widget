const all = (s) => ({ web: s, app: s, rss: s });
/** Un diagnostic par cas : source unique pour Qualipo, Atlas (cas fictif) et les previews. */
export const DIAGNOSTICS = {
    ok: {
        case: 'ok',
        steps: { livraison: 'done', traitement: 'done', parametrage: 'done' },
        channels: all('done'),
    },
    attente: {
        case: 'attente',
        steps: { livraison: 'pending', traitement: 'pending', parametrage: 'pending' },
        channels: all('pending'),
    },
    // Cause en amont : tout ce qui suit est rouge (cascade)
    doublons: {
        case: 'doublons',
        steps: { livraison: 'error', traitement: 'error', parametrage: 'error' },
        channels: all('error'),
    },
    mid_non_conforme: {
        case: 'mid_non_conforme',
        steps: { livraison: 'error', traitement: 'error', parametrage: 'error' },
        channels: all('error'),
    },
    droits_fermes: {
        case: 'droits_fermes',
        steps: { livraison: 'done', traitement: 'error', parametrage: 'error' },
        channels: all('error'),
    },
    liberation_programmee: {
        case: 'liberation_programmee',
        steps: { livraison: 'done', traitement: 'scheduled', parametrage: 'scheduled' },
        channels: all('error'),
    },
};
