import {ReactNode, RefObject, forwardRef, HTMLProps} from 'react'

type Props = {
    children: ReactNode,
    className?: string,
}

type divProps = HTMLProps<HTMLDivElement>;

// function Container({children, className, ref}: Props) {
//   return (
//     <div ref={ref} className={'container mx-auto ' + className}>
//         {children}
//     </div>
//   )
// }

const Container = forwardRef<HTMLDivElement, divProps>(({children, className},ref) => {
  return (
        <div ref={ref} className={'container mx-auto ' + className}>
            {children}
        </div>
      )
})

export default Container