import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import { decodeBase64 } from '../../../utils/decodeBase64.js';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  // Smooth scroll to top function
  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20;
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10);
  };

  // Navigate to external HRF site
  const handleReadMore = () => {
    window.location.href = 'https://www.humanrightsfirst.org';
  };

  const content = (
    <div className="flex-c flex-1">
      {/* Description Section */}
      <section className="flex-c items-center text-center px-8 py-12 primary-c">
        <h1 className="text-6xl mb-6 text-white font-serif max-w-5xl leading-tight">
          Asylum Office Grant Rate Tracker
        </h1>
        <p className="text-white text-xl max-w-4xl leading-relaxed">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers,
          policymakers, and the public an interactive tool to explore USCIS data on
          Asylum Office decisions
        </p>
      </section>

      {/* Graphs Section */}
      <section className="flex-c secondary-c">
        <div className="flex justify-center gap-16 py-20 px-8">
          <div className="flex-c items-center max-w-sm">
            <img 
              src={barGraph} 
              alt="Bar graph" 
              className="w-80 h-56 mb-6 object-contain" 
            />
            <p className="text-lg font-medium">Search Grant Rates By Office</p>
          </div>
          <div className="flex-c items-center max-w-sm">
            <img 
              src={pieChart} 
              alt="Pie chart" 
              className="w-80 h-56 mb-6 object-contain" 
            />
            <p className="text-lg font-medium">Search Grant Rates By Nationality</p>
          </div>
          <div className="flex-c items-center max-w-sm">
            <img 
              src={lineGraph} 
              alt="Line graph" 
              className="w-80 h-56 mb-6 object-contain" 
            />
            <p className="text-lg font-medium">Search Grant Rates Over Time</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 pb-16">
          <button 
            onClick={() => navigate('/graphs')}
            className="bg-[rgb(170,170,170)] text-white min-w-[114px] min-h-[44px] py-[5px] px-[10px] font-serif text-base"
          >
            View the Data
          </button>
          <button 
            onClick={downloadCSV}
            className="bg-[rgb(170,170,170)] text-white min-w-[157px] min-h-[44px] py-[5px] px-[10px] font-serif text-base"
          >
            Download the Data
          </button>
        </div>
      </section>

      {/* Data Section */}
      <section className="flex items-center px-24 py-24 secondary-c">
        <img 
          src={paperStack} 
          alt="Stack of papers" 
          className="w-[45%] h-auto object-cover mr-16" 
        />
        <div className="flex-c-1">
          <p className="text-lg leading-relaxed mb-8">
            Human Rights First has created a search tool to give you a user-friendly
            way to explore a data set of asylum decisions between FY 2016 and May
            2021 by the USCIS Asylum Office, which we received through a Freedom of
            Information Act request. You can search for information on asylum grant
            rates by year, nationality, and asylum office, visualize the data with
            charts and heat maps, and download the data set.
          </p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 secondary-c">
        <h2 className="text-5xl text-center mb-20 font-serif">
          Systemic Disparity Insights
        </h2>
        <div className="flex justify-center gap-24 px-24">
          <div className="flex-c-1 max-w-md">
            <h3 className="text-5xl mb-8 text-center">36%</h3>
            <p className="text-lg leading-relaxed text-center">
              By the end of the Trump administration, the average asylum office
              grant rate had fallen 36% from an average of 44 percent in fiscal
              year 2016 to 28 percent in fiscal year 2020.
            </p>
          </div>
          <div className="flex-c-1 max-w-md">
            <h3 className="text-5xl mb-8 text-center">5%</h3>
            <p className="text-lg leading-relaxed text-center">
              The New York asylum office grant rate dropped to 5 percent in fiscal
              year 2020.
            </p>
          </div>
          <div className="flex-c-1 max-w-md">
            <h3 className="text-5xl mb-8 text-center">6x Lower</h3>
            <p className="text-lg leading-relaxed text-center">
              Between fiscal year 2017 and 2020, the New York asylum office's
              average grant rate was 6 times lower than the San Francisco asylum
              office.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex-c items-center gap-8 py-16 secondary-c">
        <button
          onClick={handleReadMore}
          className="primary-c text-white px-4 py-2 font-serif"
        >
          Read More
        </button>
        <button
          onClick={scrollToTop}
          className="text-black hover:text-gray-600 font-serif"
        >
          Back To Top ^
        </button>
      </section>

      <div className="hidden">
        {'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}
      </div>
    </div>
  );

  return content;
};
