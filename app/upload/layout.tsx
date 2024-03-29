interface UploadLayoutProps {
    children: React.ReactNode
}

export default function UploadLayout({ children }: UploadLayoutProps) {
    return (
        <div className="h-full w-full flex-1">
            {children}
        </div>
    )
}