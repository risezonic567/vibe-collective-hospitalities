export function VineFlower({
    x,
    y,
    scale = 1,
    opened = false,
    flowerX = -25,
    flowerY = -5,
    branchX = -23,
    className = "",
}) {
    return (
        <g transform={`translate(${x} ${y})`} className={`${opened ? "vine-bloomed" : "vine-unbloomed"} ${className}`}>
            {opened && <path className="vine-branch" d={`M 0 0 C ${branchX * 0.22} -4 ${branchX * 0.58} -7 ${branchX} -5`} />}
            <g transform={`translate(${flowerX} ${flowerY})`}>
                <g className="vine-flower" style={{ "--flower-scale": scale }}>
                    {Array.from({ length: 6 }, (_, index) => (
                        <g key={index} transform={`rotate(${index * 60})`}>
                            <g className="vine-petal" style={{ "--petal-delay": `${index * 35}ms` }}>
                                <ellipse cy="-5.5" rx="3.1" ry="5.1" fill={index % 2 ? "#b8975a" : "#cca96a"} />
                            </g>
                        </g>
                    ))}
                    <circle r="2.5" fill="#f2ebd9" />
                </g>
            </g>
        </g>
    );
}
