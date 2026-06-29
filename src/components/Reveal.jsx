import { useReveal } from '../hooks/useReveal.js'

// Wraps children and fades/slides them in when scrolled into view.
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
