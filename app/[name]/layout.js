import Navbar from '../components/ui/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
