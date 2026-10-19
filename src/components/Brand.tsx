import type { SVGProps } from 'react'

// Paths come from the MATMAONLINE brand kit (logos/svg, icons/svg); colour follows currentColor.
const M =
  'M0 100 V39 C0 14 16 0 39 0 C51 0 60 4 66 13 C73 4 82 0 95 0 C117 0 132 14 132 39 V65 H107 V42 C107 30 102 24 93 24 C84 24 79 30 79 42 V100 H54 V42 C54 30 49 24 40 24 C31 24 25 30 25 42 V100 Z M107 77 H132 V102 H107 Z'
const A =
  'M89 100 H65 V88 C59 97 49 102 36 102 C13 102 0 83 0 51 C0 21 15 0 38 0 C51 0 60 5 65 13 V2 H89 Z M25 51 C25 69 32 79 45 79 C58 79 65 69 65 51 C65 33 58 23 45 23 C32 23 25 33 25 51 Z'
const T = 'M22 -29 H47 V2 H73 V25 H47 V64 C47 75 52 80 61 80 H74 V100 H58 C33 100 22 89 22 65 V25 H0 V2 H22 Z'
const O =
  'M47 0 C78 0 94 20 94 51 C94 83 78 102 47 102 C16 102 0 83 0 51 C0 20 16 0 47 0 Z M47 23 C32 23 25 34 25 51 C25 69 32 79 47 79 C62 79 69 69 69 51 C69 34 62 23 47 23 Z'
const N = 'M0 100 V2 H24 V13 C31 4 40 0 53 0 C75 0 86 14 86 39 V100 H61 V44 C61 30 55 24 45 24 C33 24 25 32 25 47 V100 Z'
const L = 'M0 -31 H25 V69 C25 77 29 81 39 81 V100 H31 C10 100 0 89 0 70 Z'
const I = 'M0 -31 H25 V-8 H0 Z M0 2 H25 V100 H0 Z'
const E =
  'M95 58 H25 C27 73 35 81 49 81 C62 81 72 75 80 67 L95 82 C84 95 70 102 49 102 C18 102 0 83 0 51 C0 21 19 0 48 0 C78 0 95 20 95 49 Z M25 39 H71 C68 26 60 20 48 20 C36 20 28 26 25 39 Z'

const LETTERS: [number, string][] = [
  [0, M], [145, A], [247, T], [334, M], [479, A], [581, O], [688, N], [787, L], [838, I], [875, N], [974, E],
]

export function Wordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -31 1069 133" fill="currentColor" role="img" aria-label="Matma Online" {...props}>
      {LETTERS.map(([x, d], i) => (
        <path key={i} d={d} transform={`translate(${x} 0)`} fillRule="evenodd" />
      ))}
    </svg>
  )
}

export function Symbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 132 102" fill="currentColor" aria-hidden="true" {...props}>
      <path d={M} fillRule="evenodd" />
    </svg>
  )
}

export type SignName = 'plus' | 'equal' | 'infinity' | 'root' | 'pi' | 'graph'

export function Sign({ name, ...props }: { name: SignName } & SVGProps<SVGSVGElement>) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden="true" {...props}>
      {name === 'plus' && <path d="M47 10 H73 V47 H110 V73 H73 V110 H47 V73 H10 V47 H47 Z" />}
      {name === 'equal' && (
        <>
          <rect x="11" y="29" width="98" height="22" />
          <rect x="11" y="69" width="98" height="22" />
        </>
      )}
      {name === 'infinity' && (
        <path d="M60 60 C39 28 10 26 10 60 C10 94 39 92 60 60 C81 28 110 26 110 60 C110 94 81 92 60 60" strokeWidth="20" {...stroke} />
      )}
      {name === 'root' && <path d="M5 58 H25 L44 96 L67 23 H116" strokeWidth="19" {...stroke} />}
      {name === 'pi' && <path d="M6 26 H114 M35 28 V94 M85 28 V76 Q85 95 105 95" strokeWidth="20" {...stroke} />}
      {name === 'graph' && (
        <>
          <path d="M16 14 V103 H111 M33 79 L62 51 L78 63 L105 22" strokeWidth="13" {...stroke} />
          <circle cx="105" cy="22" r="10" />
        </>
      )}
    </svg>
  )
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}
