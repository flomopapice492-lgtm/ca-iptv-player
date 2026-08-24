const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

class EPGParser {
  constructor() {
    this.xmlParser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true,
    });
  }

  /**
   * Parse XMLTV EPG file
   * @param {string} filePath - Path to XMLTV file
   * @returns {Promise<Object>} Parsed EPG data
   */
  async parseFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return await this.parseXML(data);
    } catch (error) {
      console.error(`Error parsing EPG file ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Parse XMLTV string
   * @param {string} xmlString - XMLTV content
   * @returns {Promise<Object>} Parsed EPG data
   */
  async parseXML(xmlString) {
    try {
      const result = await this.xmlParser.parseStringPromise(xmlString);
      return this.normalizeEPG(result.tv);
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
    }
  }

  /**
   * Normalize EPG structure to standard format
   * @param {Object} tv - Raw TV object from XML
   * @returns {Object} Normalized EPG
   */
  normalizeEPG(tv) {
    const channels = {};
    const programs = [];

    // Parse channels
    if (tv.channel) {
      const channelList = Array.isArray(tv.channel) ? tv.channel : [tv.channel];
      channelList.forEach((ch) => {
        channels[ch.id] = {
          id: ch.id,
          name: this.extractText(ch['display-name']),
          icon: ch.icon?.src || null,
        };
      });
    }

    // Parse programs
    if (tv.programme) {
      const programList = Array.isArray(tv.programme)
        ? tv.programme
        : [tv.programme];
      programList.forEach((prog) => {
        programs.push({
          id: `${prog.channel}-${prog.start}`,
          channel: prog.channel,
          title: this.extractText(prog.title),
          description: this.extractText(prog.desc),
          start: this.parseTime(prog.start),
          end: this.parseTime(prog.stop),
          category: this.extractText(prog.category),
          rating: prog.rating?.value || null,
          icon: prog.icon?.src || null,
          year: new Date(this.parseTime(prog.start)).getFullYear(),
        });
      });
    }

    return { channels, programs };
  }

  /**
   * Extract text from various EPG field formats
   * @param {*} field - Field value
   * @returns {string} Text value
   */
  extractText(field) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (Array.isArray(field)) return field[0];
    if (typeof field === 'object' && field._) return field._;
    return '';
  }

  /**
   * Parse XMLTV time format (YYYYMMDDHHMMSS +HHMM)
   * @param {string} timeStr - Time string
   * @returns {string} ISO 8601 date string
   */
  parseTime(timeStr) {
    if (!timeStr) return new Date().toISOString();

    // Format: YYYYMMDDHHMMSS +HHMM or similar variants
    const match = timeStr.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    if (!match) return new Date().toISOString();

    const [, year, month, day, hour, min, sec] = match;
    return new Date(year, month - 1, day, hour, min, sec).toISOString();
  }
}

module.exports = new EPGParser();
