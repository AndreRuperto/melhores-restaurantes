import './brand-mark.css'

// O desenho vive em /public/brand-mark.svg. A máscara mantém a cor
// alinhada ao tema atual sem depender de fontes ou de novos pacotes.
export default function BrandMark({ className = '' }) {
  return <span aria-hidden="true" className={`brand-mark ${className}`} />
}
