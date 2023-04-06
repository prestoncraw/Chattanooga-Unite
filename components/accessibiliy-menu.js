import styles from '../styles/accessibility-menu.module.css';
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

  const updateFontSize = (value) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
  };

  const updateContrast = (value) => {
    setContrast(value);
    document.documentElement.classList.toggle('contrast');
  };

  const toggleReadingGuide = () => {
    setReadingGuide(!readingGuide);
  };

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

  return (
    <>
      <main>
        <div className={styles.menu_container}>
          <div className={styles.menu_button} onClick={handleClickMenu}>
            <span className={styles.tooltip_text}>Accessibility Options</span>
            <i className="fa-solid fa-universal-access">
              <div className={styles.background}>
                <i className="fa-solid fa-circle"></i>
              </div>
            </i>
            {showMenu && (
              <div className={styles.menu_options}>
                <ul className={styles.menu_list}>
                  <li>Reset Settings</li>
                  <li onClick={toggleReadingGuide} aria-pressed={readingGuide}>
                    {readingGuide ? 'Disable ' : 'Enable '} Reading Guide
                  </li>
                  <li onClick={updateContrast}>High Contrast</li>
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
