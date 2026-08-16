export default function About() {
  return (
    <div className="container about-page">
      <p className="eyebrow">About Concourse</p>
      <h1 className="section-title">A job board, run like a terminal.</h1>
      <p className="about-lede">
        Job boards usually bury roles under filters and pagination. Concourse borrows a format
        everyone already knows how to read at a glance: the airport departures board.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <p className="mono about-card-step">01</p>
          <h2 className="about-card-title">Scan the board</h2>
          <p>Every open role shows its gate, status, and salary band up front — no digging.</p>
        </div>
        <div className="about-card">
          <p className="mono about-card-step">02</p>
          <h2 className="about-card-title">Pick a gate</h2>
          <p>Browse by department, filter by location or type, or search for a specific role.</p>
        </div>
        <div className="about-card">
          <p className="mono about-card-step">03</p>
          <h2 className="about-card-title">Board the flight</h2>
          <p>Apply straight from the role page. Roles marked "Final Call" are closing soon.</p>
        </div>
      </div>

      <p className="about-footnote">
        This is a student project built to demonstrate React fundamentals, routing, and API
        integration. It is not a real hiring platform, and no applications are stored remotely.
      </p>
    </div>
  );
}
