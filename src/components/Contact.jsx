const contactItems = [
  {
    label: 'Institution',
    value: "ST. GEORGE'S COLLEGE, ARUVITHURA",
  },
  {
    label: 'Department',
    value: 'DEPT. OF COMPUTER APPLICATIONS',
  },
  {
    label: 'Location',
    value: 'ARUVITHURA, KERALA, INDIA',
  },
  {
    label: 'Hashtag',
    value: '#ALGORA2026',
    isHashtag: true,
  },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <span className="section-label">Get In Touch</span>
        <span className="section-num">08</span>
      </div>

      <div className="contact-grid">
        <div>
          <h2 className="contact-heading">LET'S<br />CONNECT.</h2>
          <div className="contact-divider" />
          <p className="contact-desc">
            Have questions about ALGORA 2026? Want to partner with us? Reach
            out to the organizing team — we'd love to hear from you.
          </p>
        </div>

        <div className="contact-list">
          {contactItems.map((item, i) => (
            <div className="contact-item" key={i}>
              <div className="contact-item-label">{item.label}</div>
              <div className={`contact-item-value${item.isHashtag ? ' hashtag' : ''}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
