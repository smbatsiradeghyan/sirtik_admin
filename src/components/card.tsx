import type { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from "@/utils/cn.ts";

export interface CardProps extends PropsWithChildren {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
  action?: () => void
  actionComponent?: ReactNode
  actionTitle?: ReactNode
  title?: string
}

const styles = {
  card: {
    base: 'w-full bg-card text-card-foreground flex flex-col gap-6 rounded-xl     p-6 card-shadow transition-all',
  },
  title: {
    wrapper: 'flex flex-1 items-center justify-center relative',
    heading: 'flex flex-1 text-center leading-[30px] text-[22px] font-bold text-3xl',
    button: 'absolute right-0 top-0',
  },
}

export const Card: FC<CardProps> = ({
                                      title,
                                      width,
                                      className,
                                      height,
                                      children,
                                      onClick,
                                      action,
                                      actionTitle,
                                      actionComponent,
                                    }) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles.card.base, className)}
      style={width || height ? { maxWidth: width, height } : undefined}
    >
      {(!!title || !!action) && (
        <div className={styles.title.wrapper}>
          {title && <h2 className={styles.title.heading}>{title}</h2>}
          {actionComponent}
          {!!action && (
            <button
              className={cn('btn', styles.title.button)}
              onClick={action}
            >
              {actionTitle || 'Action'}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
