
export interface PhonemeExample {
  word: string;
  ipaUS: string;
  ipaUK: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'memorable';
  intonation?: string;
}

export interface PhonemeData {
  id: string;
  symbol: string;
  category: 'vowel' | 'diphthong' | 'consonant';
  type?: 'short' | 'long' | 'voiced' | 'unvoiced';
  tipsEn: {
    mouth: string;
    tongue: string;
    lips: string;
    spelling: string;
  };
  tipsEs: {
    mouth: string;
    tongue: string;
    lips: string;
    ortografia: string;
  };
  examples: PhonemeExample[];
}

export const PHONETIC_DATA: PhonemeData[] = [
  // VOWELS (12)
  {
    id: 'i-long', symbol: 'iː', category: 'vowel', type: 'long',
    tipsEn: { mouth: 'Narrow, smiling position.', tongue: 'High and forward.', lips: 'Tense and spread.', spelling: 'ee, ea, ie, e' },
    tipsEs: { mouth: 'Estrecha, como sonriendo.', tongue: 'Alta y hacia adelante.', lips: 'Tensos.', ortografia: 'ee, ea, ie, e' },
    examples: [
      { word: 'Sheep', ipaUS: '/ʃiːp/', ipaUK: '/ʃiːp/', difficulty: 'easy', intonation: 'Sheee-p' },
      { word: 'Bee', ipaUS: '/biː/', ipaUK: '/biː/', difficulty: 'easy', intonation: 'Beeee' },
      { word: 'Tea', ipaUS: '/tiː/', ipaUK: '/tiː/', difficulty: 'easy', intonation: 'Teee' },
      { word: 'Green', ipaUS: '/ɡriːn/', ipaUK: '/ɡriːn/', difficulty: 'medium', intonation: 'Gree-n' },
      { word: 'Feel', ipaUS: '/fiːl/', ipaUK: '/fiːl/', difficulty: 'medium', intonation: 'Fee-l' },
      { word: 'Team', ipaUS: '/tiːm/', ipaUK: '/tiːm/', difficulty: 'medium', intonation: 'Tee-m' },
      { word: 'Believe', ipaUS: '/bɪˈliːv/', ipaUK: '/bɪˈliːv/', difficulty: 'hard', intonation: 'be-LIE-ve' },
      { word: 'Machine', ipaUS: '/məˈʃiːn/', ipaUK: '/məˈʃiːn/', difficulty: 'hard', intonation: 'ma-CHINE' },
      { word: 'Recipe', ipaUS: '/ˈresəpi/', ipaUK: '/ˈresɪpi/', difficulty: 'hard', intonation: 'RE-ci-pe' },
      { word: 'Amoeba', ipaUS: '/əˈmiːbə/', ipaUK: '/əˈmiːbə/', difficulty: 'memorable', intonation: 'a-MEE-ba' }
    ]
  },
  {
    id: 'i-short', symbol: 'ɪ', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Slightly open.', tongue: 'High but relaxed.', lips: 'Relaxed.', spelling: 'i, y (ship, city)' },
    tipsEs: { mouth: 'Ligeramente abierta.', tongue: 'Alta pero relajada.', lips: 'Relajados.', ortografia: 'i, y (ship, city)' },
    examples: [
      { word: 'Bit', ipaUS: '/bɪt/', ipaUK: '/bɪt/', difficulty: 'easy', intonation: 'Bi-t' },
      { word: 'Pin', ipaUS: '/pɪn/', ipaUK: '/pɪn/', difficulty: 'easy', intonation: 'Pi-n' },
      { word: 'Sit', ipaUS: '/sɪt/', ipaUK: '/sɪt/', difficulty: 'easy', intonation: 'Si-t' },
      { word: 'Busy', ipaUS: '/ˈbɪzi/', ipaUK: '/ˈbɪzi/', difficulty: 'medium', intonation: 'BU-sy' },
      { word: 'Women', ipaUS: '/ˈwɪmɪn/', ipaUK: '/ˈwɪmɪn/', difficulty: 'medium', intonation: 'WI-men' },
      { word: 'Gym', ipaUS: '/dʒɪm/', ipaUK: '/dʒɪm/', difficulty: 'medium', intonation: 'Gy-m' },
      { word: 'Physique', ipaUS: '/fɪˈziːk/', ipaUK: '/fɪˈziːk/', difficulty: 'hard', intonation: 'phy-SIQUE' },
      { word: 'Rhythm', ipaUS: '/ˈrɪðəm/', ipaUK: '/ˈrɪðəm/', difficulty: 'hard', intonation: 'RHY-thm' },
      { word: 'System', ipaUS: '/ˈsɪstəm/', ipaUK: '/ˈsɪstəm/', difficulty: 'hard', intonation: 'SYS-tem' },
      { word: 'Synchronous', ipaUS: '/ˈsɪŋkrənəs/', ipaUK: '/ˈsɪŋkrənəs/', difficulty: 'memorable', intonation: 'SYN-chro-nous' }
    ]
  },
  {
    id: 'u-short', symbol: 'ʊ', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Relaxed opening.', tongue: 'Back high but relaxed.', lips: 'Neutral to slightly rounded.', spelling: 'oo, u (good, put)' },
    tipsEs: { mouth: 'Abertura relajada.', tongue: 'Parte posterior alta pero relajada.', lips: 'Neutros.', ortografia: 'oo, u (good, put)' },
    examples: [
      { word: 'Book', ipaUS: '/bʊk/', ipaUK: '/bʊk/', difficulty: 'easy', intonation: 'Boo-k' },
      { word: 'Put', ipaUS: '/pʊt/', ipaUK: '/pʊt/', difficulty: 'easy', intonation: 'Pu-t' },
      { word: 'Foot', ipaUS: '/fʊt/', ipaUK: '/fʊt/', difficulty: 'easy', intonation: 'Foo-t' },
      { word: 'Good', ipaUS: '/ɡʊd/', ipaUK: '/ɡʊd/', difficulty: 'medium', intonation: 'Goo-d' },
      { word: 'Could', ipaUS: '/kʊd/', ipaUK: '/kʊd/', difficulty: 'medium', intonation: 'Cou-ld' },
      { word: 'Pull', ipaUS: '/pʊl/', ipaUK: '/pʊl/', difficulty: 'medium', intonation: 'Pu-ll' },
      { word: 'Should', ipaUS: '/ʃʊd/', ipaUK: '/ʃʊd/', difficulty: 'hard', intonation: 'Shou-ld' },
      { word: 'Woman', ipaUS: '/ˈwʊmən/', ipaUK: '/ˈwʊmən/', difficulty: 'hard', intonation: 'WO-man' },
      { word: 'Wolf', ipaUS: '/wʊlf/', ipaUK: '/wʊlf/', difficulty: 'hard', intonation: 'Wol-f' },
      { word: 'Bullock', ipaUS: '/ˈbʊlək/', ipaUK: '/ˈbʊlək/', difficulty: 'memorable', intonation: 'BUL-lock' }
    ]
  },
  {
    id: 'u-long', symbol: 'uː', category: 'vowel', type: 'long',
    tipsEn: { mouth: 'Small, rounded.', tongue: 'Back high and tense.', lips: 'Rounded, tense.', spelling: 'oo, u-e, ew' },
    tipsEs: { mouth: 'Pequeña, redondeada.', tongue: 'Parte posterior alta.', lips: 'Redondeados.', ortografia: 'oo, u-e, ew' },
    examples: [
      { word: 'Moon', ipaUS: '/muːn/', ipaUK: '/muːn/', difficulty: 'easy' },
      { word: 'Blue', ipaUS: '/bluː/', ipaUK: '/bluː/', difficulty: 'easy' },
      { word: 'Few', ipaUS: '/fjuː/', ipaUK: '/fjuː/', difficulty: 'medium' },
      { word: 'Through', ipaUS: '/θruː/', ipaUK: '/θruː/', difficulty: 'medium' },
      { word: 'Queue', ipaUS: '/kjuː/', ipaUK: '/kjuː/', difficulty: 'hard' },
      { word: 'Juice', ipaUS: '/dʒuːs/', ipaUK: '/dʒuːs/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'e-vowel', symbol: 'e', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Open slightly wider than /ɪ/.', tongue: 'Mid-front.', lips: 'Unrounded.', spelling: 'e, ea (bed, dead)' },
    tipsEs: { mouth: 'Un poco más abierta que /ɪ/.', tongue: 'Media-frontal.', lips: 'Sin redondear.', ortografia: 'e, ea' },
    examples: [
      { word: 'Bed', ipaUS: '/bed/', ipaUK: '/bed/', difficulty: 'easy' },
      { word: 'Dead', ipaUS: '/ded/', ipaUK: '/ded/', difficulty: 'easy' },
      { word: 'Said', ipaUS: '/sed/', ipaUK: '/sed/', difficulty: 'medium' },
      { word: 'Many', ipaUS: '/ˈmeni/', ipaUK: '/ˈmeni/', difficulty: 'medium' },
      { word: 'Leisure', ipaUS: '/ˈliːʒər/', ipaUK: '/ˈleʒə/', difficulty: 'hard' },
      { word: 'Bury', ipaUS: '/ˈberi/', ipaUK: '/ˈberi/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'schwa', symbol: 'ə', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Completely relaxed.', tongue: 'Central, neutral.', lips: 'Neutral.', spelling: 'Any unstressed vowel' },
    tipsEs: { mouth: 'Totalmente relajada.', tongue: 'Central, neutra.', lips: 'Neutros.', ortografia: 'Cualquier vocal átona' },
    examples: [
      { word: 'About', ipaUS: '/əˈbaʊt/', ipaUK: '/əˈbaʊt/', difficulty: 'easy' },
      { word: 'Police', ipaUS: '/pəˈliːs/', ipaUK: '/pəˈliːs/', difficulty: 'easy' },
      { word: 'Teacher', ipaUS: '/ˈtiːtʃər/', ipaUK: '/ˈtiːtʃə/', difficulty: 'medium' },
      { word: 'Standard', ipaUS: '/ˈstændərd/', ipaUK: '/ˈstandəd/', difficulty: 'medium' },
      { word: 'Analysis', ipaUS: '/əˈnæləsɪs/', ipaUK: '/əˈnaləsɪs/', difficulty: 'hard' },
      { word: 'Phenomenon', ipaUS: '/fəˈnɑːmənɑːn/', ipaUK: '/fəˈnɒmɪnən/', difficulty: 'memorable' }
    ]
  },
  {
    id: '3-bird', symbol: 'ɜː', category: 'vowel', type: 'long',
    tipsEn: { mouth: 'Neutral opening.', tongue: 'Mid-central, slightly retracted.', lips: 'Neutral.', spelling: 'ir, ur, er (bird, hurt)' },
    tipsEs: { mouth: 'Abertura neutra.', tongue: 'Central media.', lips: 'Neutros.', ortografia: 'ir, ur, er (bird, hurt)' },
    examples: [
      { word: 'Bird', ipaUS: '/bɜːrd/', ipaUK: '/bəːd/', difficulty: 'easy' },
      { word: 'Word', ipaUS: '/wɜːrd/', ipaUK: '/wəːd/', difficulty: 'easy' },
      { word: 'Hurt', ipaUS: '/hɜːrt/', ipaUK: '/həːt/', difficulty: 'medium' },
      { word: 'Earth', ipaUS: '/ɜːrθ/', ipaUK: '/əːθ/', difficulty: 'medium' },
      { word: 'Journey', ipaUS: '/ˈdʒɜːrni/', ipaUK: '/ˈdʒəːni/', difficulty: 'hard' },
      { word: 'Colonel', ipaUS: '/ˈkɜːrnəl/', ipaUK: '/ˈkəːnəl/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'o-long', symbol: 'ɔː', category: 'vowel', type: 'long',
    tipsEn: { mouth: 'Mid-open.', tongue: 'Back retracted.', lips: 'Rounded and tense.', spelling: 'or, al, aw, au' },
    tipsEs: { mouth: 'Media abierta.', tongue: 'Parte posterior retraída.', lips: 'Redondeados y tensos.', ortografia: 'or, al, aw, au' },
    examples: [
      { word: 'Door', ipaUS: '/dɔːr/', ipaUK: '/dɔː/', difficulty: 'easy' },
      { word: 'Law', ipaUS: '/lɔː/', ipaUK: '/lɔː/', difficulty: 'easy' },
      { word: 'Walk', ipaUS: '/wɔːk/', ipaUK: '/wɔːk/', difficulty: 'medium' },
      { word: 'Thought', ipaUS: '/θɔːt/', ipaUK: '/θɔːt/', difficulty: 'medium' },
      { word: 'Bought', ipaUS: '/bɔːt/', ipaUK: '/bɔːt/', difficulty: 'hard' },
      { word: 'Daughter', ipaUS: '/ˈdɔːtər/', ipaUK: '/ˈdɔːtə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ae-apple', symbol: 'æ', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Open wide, lips stretched.', tongue: 'Low and forward.', lips: 'Relaxed but stretched.', spelling: 'a (cat, black)' },
    tipsEs: { mouth: 'Abra bien, estire labios.', tongue: 'Baja y adelante.', lips: 'Relajados.', ortografia: 'a (cat, black)' },
    examples: [
      { word: 'Cat', ipaUS: '/kæt/', ipaUK: '/kat/', difficulty: 'easy' },
      { word: 'Black', ipaUS: '/blæk/', ipaUK: '/blak/', difficulty: 'easy' },
      { word: 'Hand', ipaUS: '/hænd/', ipaUK: '/hand/', difficulty: 'medium' },
      { word: 'Fashion', ipaUS: '/ˈfæʃən/', ipaUK: '/ˈfaʃən/', difficulty: 'medium' },
      { word: 'Antique', ipaUS: '/ænˈtiːk/', ipaUK: '/anˈtiːk/', difficulty: 'hard' },
      { word: 'Moustache', ipaUS: '/ˈmʌstæʃ/', ipaUK: '/məˈstɑːʃ/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'wedge', symbol: 'ʌ', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Open mid-way.', tongue: 'Back central.', lips: 'Neutral.', spelling: 'u, o (up, come)' },
    tipsEs: { mouth: 'Abierta a la mitad.', tongue: 'Central posterior.', lips: 'Neutros.', ortografia: 'u, o (up, come)' },
    examples: [
      { word: 'Up', ipaUS: '/ʌp/', ipaUK: '/ʌp/', difficulty: 'easy' },
      { word: 'Cup', ipaUS: '/kʌp/', ipaUK: '/kʌp/', difficulty: 'easy' },
      { word: 'Money', ipaUS: '/ˈmʌni/', ipaUK: '/ˈmʌni/', difficulty: 'medium' },
      { word: 'Rough', ipaUS: '/rʌf/', ipaUK: '/rʌf/', difficulty: 'medium' },
      { word: 'Flood', ipaUS: '/flʌd/', ipaUK: '/flʌd/', difficulty: 'hard' },
      { word: 'Onion', ipaUS: '/ˈʌnjən/', ipaUK: '/ˈʌnjən/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'a-doctor', symbol: 'ɑː', category: 'vowel', type: 'long',
    tipsEn: { mouth: 'Open very wide.', tongue: 'Low and back.', lips: 'Relaxed.', spelling: 'ar, a, al (car, calm)' },
    tipsEs: { mouth: 'Abierta muy amplia.', tongue: 'Baja y posterior.', lips: 'Relajados.', ortografia: 'ar, a, al' },
    examples: [
      { word: 'Car', ipaUS: '/kɑːr/', ipaUK: '/kɑː/', difficulty: 'easy' },
      { word: 'Park', ipaUS: '/kɑːrk/', ipaUK: '/kɑːk/', difficulty: 'easy' },
      { word: 'Farm', ipaUS: '/fɑːrm/', ipaUK: '/fɑːm/', difficulty: 'medium' },
      { word: 'Father', ipaUS: '/ˈfɑːðər/', ipaUK: '/ˈfɑːðə/', difficulty: 'medium' },
      { word: 'Calm', ipaUS: '/kɑːlm/', ipaUK: '/kɑːm/', difficulty: 'hard' },
      { word: 'Heart', ipaUS: '/hɑːrt/', ipaUK: '/hɑːt/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'o-short', symbol: 'ɒ', category: 'vowel', type: 'short',
    tipsEn: { mouth: 'Open wide.', tongue: 'Low and back.', lips: 'Slightly rounded (UK).', spelling: 'o (not, hot)' },
    tipsEs: { mouth: 'Abierta amplia.', tongue: 'Baja y posterior.', lips: 'Ligeramente redondeados.', ortografia: 'o (not, hot)' },
    examples: [
      { word: 'Not', ipaUS: '/nɑːt/', ipaUK: '/nɒt/', difficulty: 'easy' },
      { word: 'Hot', ipaUS: '/hɑːt/', ipaUK: '/hɒt/', difficulty: 'easy' },
      { word: 'Box', ipaUS: '/bɑːks/', ipaUK: '/bɒks/', difficulty: 'medium' },
      { word: 'Clock', ipaUS: '/klɑːk/', ipaUK: '/klɒk/', difficulty: 'medium' },
      { word: 'Watch', ipaUS: '/wɑːtʃ/', ipaUK: '/wɒtʃ/', difficulty: 'hard' },
      { word: 'Bureaucracy', ipaUS: '/bjʊˈrɑːkrəsi/', ipaUK: '/bjʊəˈrɒkrəsi/', difficulty: 'memorable' }
    ]
  },

  // DIPHTHONGS (8)
  {
    id: 'ia', symbol: 'ɪə', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /ɪ/ to /ə/.', tongue: 'Moves from high-front to central.', lips: 'Neutral.', spelling: 'ear, eer, ere' },
    tipsEs: { mouth: 'Desliza de /ɪ/ a /ə/.', tongue: 'De adelante al centro.', lips: 'Neutros.', ortografia: 'ear, eer, ere' },
    examples: [
      { word: 'Ear', ipaUS: '/ɪr/', ipaUK: '/ɪə/', difficulty: 'easy' },
      { word: 'Near', ipaUS: '/nɪr/', ipaUK: '/nɪə/', difficulty: 'easy' },
      { word: 'Beer', ipaUS: '/bɪr/', ipaUK: '/bɪə/', difficulty: 'medium' },
      { word: 'Clear', ipaUS: '/klɪr/', ipaUK: '/klɪə/', difficulty: 'medium' },
      { word: 'Severe', ipaUS: '/sɪˈvɪr/', ipaUK: '/sɪˈvɪə/', difficulty: 'hard' },
      { word: 'Idea', ipaUS: '/aɪˈdiːə/', ipaUK: '/aɪˈdɪə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ei', symbol: 'eɪ', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /e/ to /ɪ/.', tongue: 'Moves from mid-front to high-front.', lips: 'Neutral.', spelling: 'a, ai, ay, ei' },
    tipsEs: { mouth: 'Desliza de /e/ a /ɪ/.', tongue: 'De media-adelante a alta.', lips: 'Neutros.', ortografia: 'a, ai, ay, ei' },
    examples: [
      { word: 'Say', ipaUS: '/seɪ/', ipaUK: '/seɪ/', difficulty: 'easy' },
      { word: 'Game', ipaUS: '/ɡeɪm/', ipaUK: '/ɡeɪm/', difficulty: 'easy' },
      { word: 'Wait', ipaUS: '/weɪt/', ipaUK: '/weɪt/', difficulty: 'medium' },
      { word: 'Break', ipaUS: '/breɪk/', ipaUK: '/breɪk/', difficulty: 'medium' },
      { word: 'Weight', ipaUS: '/weɪt/', ipaUK: '/weɪt/', difficulty: 'hard' },
      { word: 'Neighbour', ipaUS: '/ˈneɪbər/', ipaUK: '/ˈneɪbə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ua', symbol: 'ʊə', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /ʊ/ to /ə/.', tongue: 'Moves from high-back to central.', lips: 'Relaxed rounding to neutral.', spelling: 'ure, oor (tour, sure)' },
    tipsEs: { mouth: 'Desliza de /ʊ/ a /ə/.', tongue: 'De alta-posterior al centro.', lips: 'Relajados.', ortografia: 'ure, oor (tour, sure)' },
    examples: [
      { word: 'Tour', ipaUS: '/tʊr/', ipaUK: '/tʊə/', difficulty: 'easy' },
      { word: 'Sure', ipaUS: '/ʃʊr/', ipaUK: '/ʃʊə/', difficulty: 'medium' },
      { word: 'Pure', ipaUS: '/pjʊr/', ipaUK: '/pjʊə/', difficulty: 'medium' },
      { word: 'Cure', ipaUS: '/kjʊr/', ipaUK: '/kjʊə/', difficulty: 'hard' },
      { word: 'Amateur', ipaUS: '/ˈæmətər/', ipaUK: '/ˈamətə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'oi', symbol: 'ɔɪ', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /ɔː/ to /ɪ/.', tongue: 'Moves from mid-back to high-front.', lips: 'Rounded to spread.', spelling: 'oi, oy' },
    tipsEs: { mouth: 'Desliza de /ɔː/ a /ɪ/.', tongue: 'De media-posterior a alta-frontal.', lips: 'Redondeados a extendidos.', ortografia: 'oi, oy' },
    examples: [
      { word: 'Boy', ipaUS: '/bɔɪ/', ipaUK: '/bɔɪ/', difficulty: 'easy' },
      { word: 'Oil', ipaUS: '/ɔɪl/', ipaUK: '/ɔɪl/', difficulty: 'easy' },
      { word: 'Coin', ipaUS: '/kɔɪn/', ipaUK: '/kɔɪn/', difficulty: 'medium' },
      { word: 'Join', ipaUS: '/dʒɔɪn/', ipaUK: '/dʒɔɪn/', difficulty: 'medium' },
      { word: 'Voice', ipaUS: '/vɔɪs/', ipaUK: '/vɔɪs/', difficulty: 'hard' },
      { word: 'Loyalty', ipaUS: '/ˈlɔɪəlti/', ipaUK: '/ˈlɔɪəlti/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ou', symbol: 'əʊ', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /ə/ to /ʊ/.', tongue: 'Moves from central to high-back.', lips: 'Neutral to rounded.', spelling: 'o, ow, oa' },
    tipsEs: { mouth: 'Desliza de /ə/ a /ʊ/.', tongue: 'Del centro a alta-posterior.', lips: 'Neutros a redondeados.', ortografia: 'o, ow, oa' },
    examples: [
      { word: 'Go', ipaUS: '/ɡoʊ/', ipaUK: '/ɡəʊ/', difficulty: 'easy' },
      { word: 'Home', ipaUS: '/hoʊm/', ipaUK: '/həʊm/', difficulty: 'easy' },
      { word: 'Show', ipaUS: '/ʃoʊ/', ipaUK: '/ʃəʊ/', difficulty: 'medium' },
      { word: 'Boat', ipaUS: '/boʊt/', ipaUK: '/bəʊt/', difficulty: 'medium' },
      { word: 'Though', ipaUS: '/ðoʊ/', ipaUK: '/ðəʊ/', difficulty: 'hard' },
      { word: 'Shoulder', ipaUS: '/ˈʃoʊldər/', ipaUK: '/ˈʃəʊldə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ea', symbol: 'eə', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from /e/ to /ə/.', tongue: 'Moves from mid-front to central.', lips: 'Neutral.', spelling: 'air, are, ere' },
    tipsEs: { mouth: 'Desliza de /e/ a /ə/.', tongue: 'De media-frontal al centro.', lips: 'Neutros.', ortografia: 'air, are, ere' },
    examples: [
      { word: 'Air', ipaUS: '/er/', ipaUK: '/eə/', difficulty: 'easy' },
      { word: 'Hair', ipaUS: '/her/', ipaUK: '/heə/', difficulty: 'easy' },
      { word: 'Care', ipaUS: '/ker/', ipaUK: '/keə/', difficulty: 'medium' },
      { word: 'There', ipaUS: '/ðer/', ipaUK: '/ðeə/', difficulty: 'medium' },
      { word: 'Wear', ipaUS: '/wer/', ipaUK: '/weə/', difficulty: 'hard' },
      { word: 'Square', ipaUS: '/skwer/', ipaUK: '/skweə/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'ai', symbol: 'aɪ', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from open to /ɪ/.', tongue: 'Moves from low to high-front.', lips: 'Open to slightly spread.', spelling: 'i, y, ie' },
    tipsEs: { mouth: 'Desliza de abierta a /ɪ/.', tongue: 'De baja a alta-frontal.', lips: 'Abierta a estirada.', ortografia: 'i, y, ie' },
    examples: [
      { word: 'My', ipaUS: '/maɪ/', ipaUK: '/maɪ/', difficulty: 'easy' },
      { word: 'Time', ipaUS: '/taɪm/', ipaUK: '/taɪm/', difficulty: 'easy' },
      { word: 'Like', ipaUS: '/laɪk/', ipaUK: '/laɪk/', difficulty: 'medium' },
      { word: 'Try', ipaUS: '/traɪ/', ipaUK: '/traɪ/', difficulty: 'medium' },
      { word: 'Guide', ipaUS: '/ɡaɪd/', ipaUK: '/ɡaɪd/', difficulty: 'hard' },
      { word: 'Island', ipaUS: '/ˈaɪlənd/', ipaUK: '/ˈaɪlənd/', difficulty: 'memorable' }
    ]
  },
  {
    id: 'au', symbol: 'aʊ', category: 'diphthong',
    tipsEn: { mouth: 'Gliding from open to /ʊ/.', tongue: 'Moves from low to high-back.', lips: 'Open to rounded.', spelling: 'ou, ow' },
    tipsEs: { mouth: 'Desliza de abierta a /ʊ/.', tongue: 'De baja a alta-posterior.', lips: 'Abierta a redondeada.', ortografia: 'ou, ow' },
    examples: [
      { word: 'Now', ipaUS: '/naʊ/', ipaUK: '/naʊ/', difficulty: 'easy' },
      { word: 'Out', ipaUS: '/aʊt/', ipaUK: '/aʊt/', difficulty: 'easy' },
      { word: 'How', ipaUS: '/haʊ/', ipaUK: '/haʊ/', difficulty: 'medium' },
      { word: 'House', ipaUS: '/haʊs/', ipaUK: '/haʊs/', difficulty: 'medium' },
      { word: 'Cloud', ipaUS: '/klaʊd/', ipaUK: '/klaʊd/', difficulty: 'hard' },
      { word: 'Mountain', ipaUS: '/ˈmaʊntən/', ipaUK: '/ˈmaʊntɪn/', difficulty: 'memorable' }
    ]
  },

  // CONSONANTS (24)
  {
    id: 'p-consonant', symbol: 'p', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Pressed lips release air.', tongue: 'Neutral.', lips: 'Burst of air.', spelling: 'p, pp' },
    tipsEs: { mouth: 'Labios presionados sueltan aire.', tongue: 'Neutra.', lips: 'Explosión de aire.', ortografia: 'p, pp' },
    examples: [
      { word: 'Pen', ipaUS: '/pen/', ipaUK: '/pen/', difficulty: 'easy', intonation: 'Pe-n' },
      { word: 'Push', ipaUS: '/pʊʃ/', ipaUK: '/pʊʃ/', difficulty: 'easy', intonation: 'Pu-sh' },
      { word: 'Top', ipaUS: '/tɑːp/', ipaUK: '/tɒp/', difficulty: 'easy', intonation: 'To-p' },
      { word: 'Apple', ipaUS: '/ˈæpəl/', ipaUK: '/ˈapəl/', difficulty: 'medium', intonation: 'A-pple' },
      { word: 'Paper', ipaUS: '/ˈpeɪpər/', ipaUK: '/ˈpeɪpə/', difficulty: 'medium', intonation: 'PA-per' },
      { word: 'Support', ipaUS: '/səˈpɔːrt/', ipaUK: '/səˈpɔːt/', difficulty: 'medium', intonation: 'sup-PORT' },
      { word: 'Pneumonia', ipaUS: '/nuːˈmoʊniə/', ipaUK: '/njuːˈməʊniə/', difficulty: 'hard', intonation: 'pneu-MO-nia' },
      { word: 'Receipt', ipaUS: '/rɪˈsiːt/', ipaUK: '/rɪˈsiːt/', difficulty: 'hard', intonation: 're-CEIPT' },
      { word: 'Psychology', ipaUS: '/saɪˈkɑːlədʒi/', ipaUK: '/saɪˈkɒlədʒi/', difficulty: 'hard', intonation: 'psy-CHO-lo-gy' },
      { word: 'Pterodactyl', ipaUS: '/ˌterəˈdæktɪl/', ipaUK: '/ˌterəˈdaktɪl/', difficulty: 'memorable', intonation: 'pte-ro-DAC-tyl' }
    ]
  },
  {
    id: 'b-consonant', symbol: 'b', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Lips pressed, then voice.', tongue: 'Neutral.', lips: 'Voiced burst.', spelling: 'b, bb' },
    tipsEs: { mouth: 'Labios presionados, voz.', tongue: 'Neutra.', lips: 'Explosión sonora.', ortografia: 'b, bb' },
    examples: [
      { word: 'Big', ipaUS: '/bɪɡ/', ipaUK: '/bɪɡ/', difficulty: 'easy' },
      { word: 'Baby', ipaUS: '/ˈbeɪbi/', ipaUK: '/ˈbeɪbi/', difficulty: 'medium' },
      { word: 'Subtle', ipaUS: '/ˈsʌtəl/', ipaUK: '/ˈsʌtl/', difficulty: 'hard' }
    ]
  },
  {
    id: 't-consonant', symbol: 't', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Tongue tip against ridge.', tongue: 'Tip at alveolar ridge.', lips: 'Open.', spelling: 't, tt' },
    tipsEs: { mouth: 'Punta lengua contra encía.', tongue: 'Punta en encía sup.', lips: 'Abiertos.', ortografia: 't, tt' },
    examples: [
      { word: 'Tea', ipaUS: '/tiː/', ipaUK: '/tiː/', difficulty: 'easy' },
      { word: 'Table', ipaUS: '/ˈteɪbəl/', ipaUK: '/ˈteɪbl/', difficulty: 'medium' },
      { word: 'Watched', ipaUS: '/wɑːtʃt/', ipaUK: '/wɒtʃt/', difficulty: 'hard' }
    ]
  },
  {
    id: 'd-consonant', symbol: 'd', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Tongue ridge, voiced.', tongue: 'Tip at ridge.', lips: 'Open.', spelling: 'd, dd' },
    tipsEs: { mouth: 'Lengua encía, voz.', tongue: 'Punta en encía.', lips: 'Abiertos.', ortografia: 'd, dd' },
    examples: [
      { word: 'Dog', ipaUS: '/dɔːɡ/', ipaUK: '/dɒɡ/', difficulty: 'easy' },
      { word: 'Added', ipaUS: '/ˈædəd/', ipaUK: '/ˈadɪd/', difficulty: 'medium' },
      { word: 'Played', ipaUS: '/pleɪd/', ipaUK: '/pleɪd/', difficulty: 'hard' }
    ]
  },
  {
    id: 'ch-consonant', symbol: 'tʃ', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'T + SH combination.', tongue: 'Blocks air then slides.', lips: 'Protruded.', spelling: 'ch, tch' },
    tipsEs: { mouth: 'Combinación T + SH.', tongue: 'Bloquea y desliza.', lips: 'Hacia afuera.', ortografia: 'ch, tch' },
    examples: [
      { word: 'Chips', ipaUS: '/tʃɪps/', ipaUK: '/tʃɪps/', difficulty: 'easy' },
      { word: 'Watch', ipaUS: '/wɑːtʃ/', ipaUK: '/wɒtʃ/', difficulty: 'medium' },
      { word: 'Future', ipaUS: '/ˈfjuːtʃər/', ipaUK: '/ˈfjuːtʃə/', difficulty: 'hard' }
    ]
  },
  {
    id: 'j-consonant', symbol: 'dʒ', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'D + ZH combination.', tongue: 'Blocks air, voiced slide.', lips: 'Protruded.', spelling: 'j, g (gem), dge' },
    tipsEs: { mouth: 'Combinación D + ZH.', tongue: 'Bloquea, sonora.', lips: 'Hacia afuera.', ortografia: 'j, g (gem), dge' },
    examples: [
      { word: 'Jam', ipaUS: '/dʒæm/', ipaUK: '/dʒam/', difficulty: 'easy' },
      { word: 'Large', ipaUS: '/lɑːrdʒ/', ipaUK: '/lɑːdʒ/', difficulty: 'medium' },
      { word: 'Graduate', ipaUS: '/ˈɡrædʒueɪt/', ipaUK: '/ˈɡradʒʊeɪt/', difficulty: 'hard' }
    ]
  },
  {
    id: 'k-consonant', symbol: 'k', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Back of tongue ridge.', tongue: 'Back high.', lips: 'Neutral.', spelling: 'k, c, ck, qu' },
    tipsEs: { mouth: 'Post. lengua arriba.', tongue: 'Post. alta.', lips: 'Neutros.', ortografia: 'k, c, ck, qu' },
    examples: [
      { word: 'Key', ipaUS: '/kiː/', ipaUK: '/kiː/', difficulty: 'easy' },
      { word: 'Car', ipaUS: '/kɑːr/', ipaUK: '/kɑː/', difficulty: 'medium' },
      { word: 'Queue', ipaUS: '/kjuː/', ipaUK: '/kjuː/', difficulty: 'hard' }
    ]
  },
  {
    id: 'g-consonant', symbol: 'g', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Back ridge, voiced.', tongue: 'Back high.', lips: 'Neutral.', spelling: 'g, gg' },
    tipsEs: { mouth: 'Post. arriba, voz.', tongue: 'Post. alta.', lips: 'Neutros.', ortografia: 'g, gg' },
    examples: [
      { word: 'Green', ipaUS: '/ɡriːn/', ipaUK: '/ɡriːn/', difficulty: 'easy' },
      { word: 'Sugar', ipaUS: '/ˈʃʊɡər/', ipaUK: '/ˈʃʊɡə/', difficulty: 'medium' },
      { word: 'Ghost', ipaUS: '/ɡoʊst/', ipaUK: '/ɡəʊst/', difficulty: 'hard' }
    ]
  },
  {
    id: 'f-consonant', symbol: 'f', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Teeth on lips.', tongue: 'Neutral.', lips: 'Bottom lip against top teeth.', spelling: 'f, ff, ph, gh' },
    tipsEs: { mouth: 'Dientes en labios.', tongue: 'Neutra.', lips: 'Labio inf. contra dientes.', ortografia: 'f, ff, ph, gh' },
    examples: [
      { word: 'Fire', ipaUS: '/ˈfaɪər/', ipaUK: '/ˈfaɪə/', difficulty: 'easy' },
      { word: 'Phone', ipaUS: '/foʊn/', ipaUK: '/fəʊn/', difficulty: 'medium' },
      { word: 'Rough', ipaUS: '/rʌf/', ipaUK: '/rʌf/', difficulty: 'hard' }
    ]
  },
  {
    id: 'v-consonant', symbol: 'v', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Teeth on lips, voiced.', tongue: 'Neutral.', lips: 'Voiced friction.', spelling: 'v' },
    tipsEs: { mouth: 'Dientes labios, voz.', tongue: 'Neutra.', lips: 'Fricción sonora.', ortografia: 'v' },
    examples: [
      { word: 'Video', ipaUS: '/ˈvɪdiˌoʊ/', ipaUK: '/ˈvɪdɪəʊ/', difficulty: 'easy' },
      { word: 'Move', ipaUS: '/muːv/', ipaUK: '/muːv/', difficulty: 'medium' },
      { word: 'Of', ipaUS: '/əv/', ipaUK: '/əv/', difficulty: 'hard' }
    ]
  },
  {
    id: 'theta-consonant', symbol: 'θ', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Tongue between teeth.', tongue: 'Tip between teeth.', lips: 'Open.', spelling: 'th (thin)' },
    tipsEs: { mouth: 'Lengua entre dientes.', tongue: 'Punta entre dientes.', lips: 'Abiertos.', ortografia: 'th (thin)' },
    examples: [
      { word: 'Thin', ipaUS: '/θɪn/', ipaUK: '/θɪn/', difficulty: 'easy' },
      { word: 'Bath', ipaUS: '/bæθ/', ipaUK: '/bɑːθ/', difficulty: 'medium' },
      { word: 'Method', ipaUS: '/ˈmeθəd/', ipaUK: '/ˈmeθəd/', difficulty: 'hard' }
    ]
  },
  {
    id: 'eth-consonant', symbol: 'ð', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Tongue between teeth, voice.', tongue: 'Tip between teeth.', lips: 'Open.', spelling: 'th (this)' },
    tipsEs: { mouth: 'Entre dientes, voz.', tongue: 'Punta entre dientes.', lips: 'Abiertos.', ortografia: 'th (this)' },
    examples: [
      { word: 'This', ipaUS: '/ðɪs/', ipaUK: '/ðɪs/', difficulty: 'easy' },
      { word: 'Mother', ipaUS: '/ˈmʌðər/', ipaUK: '/ˈmʌðə/', difficulty: 'medium' },
      { word: 'Breathe', ipaUS: '/briːð/', ipaUK: '/briːð/', difficulty: 'hard' }
    ]
  },
  {
    id: 's-consonant', symbol: 's', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Hissing sound.', tongue: 'Tip near ridge.', lips: 'Open.', spelling: 's, ss, c (city), sc' },
    tipsEs: { mouth: 'Sonido siseante.', tongue: 'Punta cerca encía.', lips: 'Abiertos.', ortografia: 's, ss, c, sc' },
    examples: [
      { word: 'See', ipaUS: '/siː/', ipaUK: '/siː/', difficulty: 'easy' },
      { word: 'City', ipaUS: '/ˈsɪti/', ipaUK: '/ˈsɪti/', difficulty: 'medium' },
      { word: 'Scene', ipaUS: '/siːn/', ipaUK: '/siːn/', difficulty: 'hard' }
    ]
  },
  {
    id: 'z-consonant', symbol: 'z', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Buzzing sound.', tongue: 'Tip near ridge.', lips: 'Open.', spelling: 'z, s (is)' },
    tipsEs: { mouth: 'Zumbido.', tongue: 'Punta cerca encía.', lips: 'Abiertos.', ortografia: 'z, s (is)' },
    examples: [
      { word: 'Zebra', ipaUS: '/ˈziːbrə/', ipaUK: '/ˈziːbrə/', difficulty: 'easy' },
      { word: 'Has', ipaUS: '/hæz/', ipaUK: '/haz/', difficulty: 'medium' },
      { word: 'Scissors', ipaUS: '/ˈsɪzərz/', ipaUK: '/ˈsɪzəz/', difficulty: 'hard' }
    ]
  },
  {
    id: 'sh-consonant', symbol: 'ʃ', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Quiet sound.', tongue: 'Middle high.', lips: 'Protruded.', spelling: 'sh, ti (action), ci' },
    tipsEs: { mouth: 'Silencio.', tongue: 'Media arriba.', lips: 'Hacia afuera.', ortografia: 'sh, ti, ci' },
    examples: [
      { word: 'Shop', ipaUS: '/ʃɑːp/', ipaUK: '/ʃɒp/', difficulty: 'easy' },
      { word: 'Action', ipaUS: '/ˈækʃən/', ipaUK: '/ˈakʃən/', difficulty: 'medium' },
      { word: 'Special', ipaUS: '/ˈspeʃəl/', ipaUK: '/ˈspeʃl/', difficulty: 'hard' }
    ]
  },
  {
    id: 'zh-consonant', symbol: 'ʒ', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Voiced quiet sound.', tongue: 'Middle high.', lips: 'Protruded.', spelling: 's (leisure), si' },
    tipsEs: { mouth: 'S sonora.', tongue: 'Media arriba.', lips: 'Hacia afuera.', ortografia: 's (leisure), si' },
    examples: [
      { word: 'Television', ipaUS: '/ˈteləˌvɪʒən/', ipaUK: '/ˈtelɪˌvɪʒn/', difficulty: 'easy' },
      { word: 'Leisure', ipaUS: '/ˈliːʒər/', ipaUK: '/ˈleʒə/', difficulty: 'medium' },
      { word: 'Genre', ipaUS: '/ˈʒɑːnrə/', ipaUK: '/ˈʒɑːnrə/', difficulty: 'hard' }
    ]
  },
  {
    id: 'm-consonant', symbol: 'm', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Nasal from lips.', tongue: 'Neutral.', lips: 'Closed.', spelling: 'm, mm' },
    tipsEs: { mouth: 'Nasal labial.', tongue: 'Neutra.', lips: 'Cerrados.', ortografia: 'm, mm' },
    examples: [
      { word: 'Man', ipaUS: '/mæn/', ipaUK: '/man/', difficulty: 'easy' },
      { word: 'Summer', ipaUS: '/ˈsʌmər/', ipaUK: '/ˈsʌmə/', difficulty: 'medium' },
      { word: 'Lamb', ipaUS: '/læm/', ipaUK: '/lam/', difficulty: 'hard' }
    ]
  },
  {
    id: 'n-consonant', symbol: 'n', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Nasal from ridge.', tongue: 'Tip at ridge.', lips: 'Open.', spelling: 'n, nn' },
    tipsEs: { mouth: 'Nasal dental.', tongue: 'Punta en encía.', lips: 'Abiertos.', ortografia: 'n, nn' },
    examples: [
      { word: 'No', ipaUS: '/noʊ/', ipaUK: '/nəʊ/', difficulty: 'easy' },
      { word: 'Funny', ipaUS: '/ˈfʌni/', ipaUK: '/ˈfʌni/', difficulty: 'medium' },
      { word: 'Knife', ipaUS: '/naɪf/', ipaUK: '/naɪf/', difficulty: 'hard' }
    ]
  },
  {
    id: 'ng-consonant', symbol: 'ŋ', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Nasal back.', tongue: 'Back high.', lips: 'Open.', spelling: 'ng, n (pink)' },
    tipsEs: { mouth: 'Nasal posterior.', tongue: 'Post. alta.', lips: 'Abiertos.', ortografia: 'ng, n (pink)' },
    examples: [
      { word: 'Sing', ipaUS: '/sɪŋ/', ipaUK: '/sɪŋ/', difficulty: 'easy' },
      { word: 'Uncle', ipaUS: '/ˈʌŋkəl/', ipaUK: '/ˈʌŋkl/', difficulty: 'medium' },
      { word: 'Tongue', ipaUS: '/tʌŋ/', ipaUK: '/tʌŋ/', difficulty: 'hard' }
    ]
  },
  {
    id: 'h-consonant', symbol: 'h', category: 'consonant', type: 'unvoiced',
    tipsEn: { mouth: 'Breath sound.', tongue: 'Neutral.', lips: 'Open.', spelling: 'h, wh (who)' },
    tipsEs: { mouth: 'Aliento.', tongue: 'Neutra.', lips: 'Abiertos.', ortografia: 'h, wh (who)' },
    examples: [
      { word: 'How', ipaUS: '/haʊ/', ipaUK: '/haʊ/', difficulty: 'easy' },
      { word: 'Behind', ipaUS: '/bɪˈhaɪnd/', ipaUK: '/bɪˈhaɪnd/', difficulty: 'medium' },
      { word: 'Who', ipaUS: '/huː/', ipaUK: '/huː/', difficulty: 'hard' }
    ]
  },
  {
    id: 'l-consonant', symbol: 'l', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Lateral sound.', tongue: 'Tip at ridge.', lips: 'Open.', spelling: 'l, ll' },
    tipsEs: { mouth: 'Lateral.', tongue: 'Punta en encía.', lips: 'Abiertos.', ortografia: 'l, ll' },
    examples: [
      { word: 'Light', ipaUS: '/laɪt/', ipaUK: '/laɪt/', difficulty: 'easy' },
      { word: 'Table', ipaUS: '/ˈteɪbəl/', ipaUK: '/ˈteɪbl/', difficulty: 'medium' },
      { word: 'Full', ipaUS: '/fʊl/', ipaUK: '/fʊl/', difficulty: 'hard' }
    ]
  },
  {
    id: 'r-consonant', symbol: 'r', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Retrofracted.', tongue: 'Curled back.', lips: 'Slightly rounded.', spelling: 'r, rr, wr' },
    tipsEs: { mouth: 'Retrofleja.', tongue: 'Hacia atrás.', lips: 'Ligeramente redondeados.', ortografia: 'r, rr, wr' },
    examples: [
      { word: 'Right', ipaUS: '/raɪt/', ipaUK: '/raɪt/', difficulty: 'easy' },
      { word: 'Very', ipaUS: '/ˈveri/', ipaUK: '/ˈvɛri/', difficulty: 'medium' },
      { word: 'Write', ipaUS: '/raɪt/', ipaUK: '/raɪt/', difficulty: 'hard' }
    ]
  },
  {
    id: 'w-consonant', symbol: 'w', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Gliding.', tongue: 'High back.', lips: 'Very rounded.', spelling: 'w, wh' },
    tipsEs: { mouth: 'Deslizante.', tongue: 'Alta posterior.', lips: 'Muy redondeados.', ortografia: 'w, wh' },
    examples: [
      { word: 'Win', ipaUS: '/wɪn/', ipaUK: '/wɪn/', difficulty: 'easy' },
      { word: 'Where', ipaUS: '/wer/', ipaUK: '/wɛə/', difficulty: 'medium' },
      { word: 'One', ipaUS: '/wʌn/', ipaUK: '/wʌn/', difficulty: 'hard' }
    ]
  },
  {
    id: 'y-consonant', symbol: 'j', category: 'consonant', type: 'voiced',
    tipsEn: { mouth: 'Gliding.', tongue: 'High front.', lips: 'Spread.', spelling: 'y (yes)' },
    tipsEs: { mouth: 'Deslizante.', tongue: 'Alta anterior.', lips: 'Estirados.', ortografia: 'y (yes)' },
    examples: [
      { word: 'Yes', ipaUS: '/jes/', ipaUK: '/jes/', difficulty: 'easy' },
      { word: 'View', ipaUS: '/vjuː/', ipaUK: '/vjuː/', difficulty: 'medium' },
      { word: 'Onion', ipaUS: '/ˈʌnjən/', ipaUK: '/ˈʌnjən/', difficulty: 'hard' }
    ]
  }
];
