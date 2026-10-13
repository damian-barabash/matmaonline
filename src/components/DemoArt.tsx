import type { Art } from '../content/types'

function Sticker({ x, y, on }: { x: number; y: number; on: boolean }) {
  // five-point star sticker with a paper rim
  const pts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 6.2 : 13
    const a = (Math.PI / 5) * i - Math.PI / 2
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
  return (
    <g>
      <circle cx={x} cy={y} r="17" className={on ? 'art-chip art-chip--on' : 'art-chip'} />
      <polygon points={pts} className={on ? 'art-ink' : 'art-ink art-ink--soft'} />
    </g>
  )
}

function Pencil({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g transform={`translate(${x - 7} ${y - 34})`} className={on ? 'art-pencil art-pencil--on' : 'art-pencil'}>
      <path d="M0 18 L7 0 L14 18 Z" className="art-pencil__tip" />
      <rect x="0" y="18" width="14" height="44" className="art-pencil__body" />
      <rect x="0" y="62" width="14" height="6" className="art-pencil__end" />
    </g>
  )
}

function Groups({ art }: { art: Extract<Art, { type: 'groups' }> }) {
  const per = art.total / art.groups
  const cols = art.item === 'pencil' ? per : Math.ceil(per / 2)
  const rows = Math.ceil(per / cols)
  const stepX = art.item === 'pencil' ? 22 : 40
  const stepY = art.item === 'pencil' ? 80 : 40
  const gw = cols * stepX + 20
  const gh = rows * stepY + 20
  const gap = 14
  const W = art.groups * gw + (art.groups - 1) * gap + 8
  const H = gh + 8 + (art.equation ? 46 : 0)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="art" aria-hidden="true">
      {Array.from({ length: art.groups }, (_, g) => {
        const gx = 4 + g * (gw + gap)
        const on = g === 0
        return (
          <g key={g}>
            <rect x={gx} y="4" width={gw} height={gh} rx="14" className={on ? 'art-group art-group--on' : 'art-group'} />
            {Array.from({ length: per }, (_, i) => {
              const cx = gx + 10 + stepX / 2 + (i % cols) * stepX
              const cy = 4 + 10 + stepY / 2 + Math.floor(i / cols) * stepY
              return art.item === 'pencil' ? <Pencil key={i} x={cx} y={cy} on={on} /> : <Sticker key={i} x={cx} y={cy} on={on} />
            })}
          </g>
        )
      })}
      {art.equation && (
        <text x={W / 2} y={H - 8} textAnchor="middle" className="art-eq">
          {art.equation}
        </text>
      )}
    </svg>
  )
}

export function DemoArt({ art }: { art: Art }) {
  if (art.type === 'groups') return <Groups art={art} />
  if (art.type === 'equation')
    return (
      <div className="art-sum" aria-hidden="true">
        <span className="art-sum__eq">{art.text}</span>
        <span className="art-sum__answer">{art.answer}</span>
      </div>
    )
  if (art.type === 'words')
    return (
      <dl className="art-words" aria-hidden="true">
        {art.pairs.map(([pl, ru]) => (
          <div key={pl}>
            <dt lang="pl">{pl}</dt>
            <dd>{ru}</dd>
          </div>
        ))}
      </dl>
    )
  return (
    <div className="art-answer" aria-hidden="true" lang="pl">
      {art.text}
    </div>
  )
}
