import { COLORS } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

interface TerminalWindowProps {
    children: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ children, title = "terminal", style }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: COLORS.TERMINAL_BG,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                ...style,
            }}
        >
            {/* Title Bar */}
            <div
                style={{
                    height: 36,
                    backgroundColor: COLORS.TERMINAL_BAR,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: "12px 12px 0 0", // Added top rounding to bar
                }}
            >
                {/* Buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
                </div>

                {/* Title */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontFamily,
                        fontSize: 14,
                        color: COLORS.TEXT_MUTED,
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "0 60px", // Avoid overlapping buttons
                    }}
                >
                    {title}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {children}
            </div>
        </div>
    );
};
