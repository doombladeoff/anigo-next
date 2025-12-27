export const InfoRow = ({ label, value }: any) => {
    return (
        <div className="flex gap-2">
            <span>{label}:</span>
            <span className="font-semibold">{value || "—"}</span>
        </div>
    );
}