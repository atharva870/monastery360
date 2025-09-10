export default function Plan() {
  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Plan Your Trip</h1>
        <p className="mt-2 max-w-prose text-foreground/70">
          Official resources for permits, registered agents, and government
          accommodations.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="font-serif text-xl">Accommodations</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Prefer government or registered stays for reliability.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm">
            <li>
              <a
                className="btn btn-outline"
                href="https://sikkimtourism.gov.in/Public/TravellerEssentials/accomodations"
                target="_blank"
                rel="noreferrer"
              >
                Sikkim Tourism: Accommodations directory
              </a>
            </li>
            <li>
              <a
                className="btn btn-outline"
                href="https://www.gangtoksmartcity.com/Hotels.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Gangtok Smart City: Hotels list
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-serif text-xl">Travel Agents</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Use the official registry to book tours and taxis.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm">
            <li>
              <a
                className="btn btn-outline"
                href="https://sikkimtourism.gov.in/Public/TravellerEssentials/TravelAgents"
                target="_blank"
                rel="noreferrer"
              >
                Registered Travel Agents (Official)
              </a>
            </li>
            <li>
              <a
                className="btn btn-outline"
                href="https://utcdemo.uk.gov.in/starbus/Sikkim/Home.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Sikkim Nationalised Transport (SNT) online services
              </a>
            </li>
            <li>
              <a
                className="btn btn-outline"
                href="https://www.redbus.in/online-booking/sikkim-nationalised-transport-snt"
                target="_blank"
                rel="noreferrer"
              >
                SNT tickets on redBus
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-xl border p-4">
        <h2 className="font-serif text-xl">Permits</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Check current rules and apply online where available.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a
            className="btn btn-outline"
            href="https://sikkimtourism.gov.in/Public/TravellerEssentials/pap"
            target="_blank"
            rel="noreferrer"
          >
            PAP / RAP (Tourist Permits)
          </a>
          <a
            className="btn btn-outline"
            href="https://sikkimtourism.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Sikkim Tourism Official Portal
          </a>
        </div>
      </section>
    </div>
  );
}
