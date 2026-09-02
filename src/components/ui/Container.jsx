import { cn } from '../../lib/cn'

export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1320px] px-6 lg:px-10 xl:px-14', className)} {...rest}>
      {children}
    </Tag>
  )
}
