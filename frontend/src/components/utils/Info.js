function Info({ text, title = "No Records Found" }) {
    return (
        <div className="empty-state-card">
            <div className="empty-state-icon">
                <i className="fa-solid fa-folder-open"></i>
            </div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-desc">{text}</p>
        </div>
    );
}

export default Info;