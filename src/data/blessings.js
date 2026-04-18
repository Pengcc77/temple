export const blessings = {
  safeBirth: [
    '願生產順利，母子平安，心安圓滿。',
    '願一切過程平順安穩，迎來平安喜悅。',
    '願身心安定，順心順產，福氣常伴。',
    '願娘娘庇佑，平安度過每一刻等待。',
    '願溫柔守護常在，迎接新生命安然到來。',
  ],
  babyHealth: [
    '願寶寶平安健康，日日安穩成長。',
    '願孩子身心康健，平安喜樂，福氣綿長。',
    '願純淨祝福相伴，守護孩子健康長大。',
    '願平安與溫柔常伴孩子左右。',
    '願寶寶安好順遂，在愛與祝福中成長。',
  ],
  gratitude: [
    '感謝一路庇佑，願福澤延續，心中常安。',
    '感謝娘娘守護，願平安與喜悅長留。',
    '願以感謝之心，回應一路以來的溫柔庇佑。',
    '感謝平安順遂，願祝福延續到未來每一天。',
    '懷著感恩而來，願心中的光亮長久不息。',
  ],
  familySupport: [
    '願陪伴化作安定力量，守護家人平安順遂。',
    '願一家同心，溫柔相伴，共迎平安喜悅。',
    '願此刻的祝福，成為家人心中的安穩力量。',
    '願關懷與守護同行，陪伴家人走過每段等待。',
    '願家人彼此扶持，平安圓滿，福氣常在。',
  ],
}

export const wishTypeLabelMap = {
  safeBirth: '求順利生產',
  babyHealth: '求寶寶健康平安',
  gratitude: '感謝娘娘庇佑',
  familySupport: '陪家人一起祈福',
}

export function getBlessingsByType(type) {
  return blessings[type] || blessings.babyHealth
}

export function getRandomBlessing(type) {
  const list = getBlessingsByType(type)
  return list[Math.floor(Math.random() * list.length)]
}
