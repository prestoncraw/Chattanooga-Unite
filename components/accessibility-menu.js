import styles from '../styles/accessibility-menu.module.css';
import KeyNum from '../styles/KeyNum.module.css';
import FindHelp from '../styles/FindHelp.module.css';
import Home from '../styles/Home.module.css';
import Nav from '../styles/NavBar.module.css';
import Footer from '../styles/Footer.module.css';
import { useState, useEffect } from 'react';

export default function AccessibilityMenu() {
  // whether menu is opened or closed
  const [showMenu, setShowMenu] = useState(false);

  function handleClickMenu() {
    setShowMenu(!showMenu);
  };

  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState('normal');
  const [readingGuide, setReadingGuide] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  // toggle reading guide option 
  const toggleReadingGuide = () => {
    setReadingGuide(!readingGuide);
  };

  // reading guide to follow mouse y-axis  
  const handleMouseMove = (e) => {
    setMouseY(e.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (readingGuide) {
      document.body.classList.add('reading-guide-active');
    } else {
      document.body.classList.remove('reading-guide-active');
    }
  }, [readingGuide]);

  // update font size 
  const updateFontSize = (value) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
  };

  // switch contrast mode 
  const updateContrast = (value) => {
    setContrast(value);
    document.documentElement.classList.toggle('contrast');
    document.documentElement.classList.toggle(KeyNum.contrast);
    document.documentElement.classList.toggle(FindHelp.contrast);
    document.documentElement.classList.toggle(Home.contrast);
    document.documentElement.classList.toggle(Nav.contrast);
    document.documentElement.classList.toggle(Footer.contrast);
  };

  // reset all menu settings to original state 
  const resetSettings = () => {
    setFontSize(16);
    setContrast('normal');
    setReadingGuide(false);
    document.documentElement.style.fontSize = '16px';
    document.documentElement.classList.remove('contrast');
    document.documentElement.classList.remove(KeyNum.contrast);
    document.documentElement.classList.remove(FindHelp.contrast);
    document.documentElement.classList.remove(Home.contrast);
    document.documentElement.classList.remove(Nav.contrast);
    document.documentElement.classList.remove(Footer.contrast);
    document.body.classList.remove('reading-guide-active');
  };

  return (
    <>
      <main>
        {/* >>>>>>>> menu button <<<<<<<<  */}
        <div className={styles.menu_container}>
          <div className={styles.menu_button} onClick={handleClickMenu}>
            <span className={styles.tooltip_text}>Accessibility Options</span>
            <i className="fa-solid fa-universal-access">
              <div className={styles.background}>
                <i class="fa-solid fa-circle"></i>
              </div>
            </i>
            {/* >>>>>>>> menu options <<<<<<<< */}
            {showMenu && (
              <div className={styles.menu_options}>
                <ul className={styles.menu_list}>
                  {/* reset button */}
                  <li onClick={resetSettings}>Reset Settings</li> 

                  {/* reading guide button */}
                  <li onClick={toggleReadingGuide} aria-pressed={readingGuide}>
                    {readingGuide ? 'Disable ' : 'Enable '} Reading Guide
                  </li>

                  {/* contrast button */}
                  <li onClick={updateContrast}>High Contrast</li>

                  {/* font slider */}
                  <li className={styles.font_size}>
                    <label>Font Size</label>
                    <input
                      type="range"
                      id="font-size"
                      min="12"
                      max="24"
                      step="2"
                      value={fontSize}
                      onChange={(e) => updateFontSize(e.target.value)}
                      className={styles.slider}
                    />
                  </li>
                </ul>
              </div>
            )}
            {readingGuide && (
              <div
                className="reading-guide"
                style={{ top: mouseY }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
