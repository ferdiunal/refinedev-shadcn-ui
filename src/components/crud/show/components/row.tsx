export const Row = ({
    title,
    content,
}: {
    title?: string;
    content?: string | number;
}) => {
    return (
        <>
            <dl className="flex flex-wrap">
                <div className="flex-auto pl-6 pt-6">
                    <dt className="scroll-m-20 text-lg font-semibold tracking-tight">
                        {title}
                    </dt>
                    <dd className="mt-1 text-base font-normal text-foreground leading-7">
                        {content}
                    </dd>
                </div>
            </dl>
        </>
    );
};
