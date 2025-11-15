import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const LayoutContainer = ({ component: Component, isHeader, isFooter, title }) => {
  document.title = 'Cá Cảnh Tian - ' + title;
  return (
    <>
      {isHeader && <Header />}
      <Component />
      {isFooter && <Footer />}
    </>
  );
};

export default LayoutContainer;
