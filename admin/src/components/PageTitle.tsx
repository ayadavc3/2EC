import React from 'react'

interface PageTitleProps {
    title: string
    description: string
    children: React.ReactNode
}

const PageTitle = ({ title, description, children }: PageTitleProps) => {
    return (
        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h2>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </div>
    )
}

export { PageTitle }