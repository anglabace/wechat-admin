export default class DateUtils {

  static format (date: Date = new Date(), format: string = 'yyyy-MM-dd hh:mm:ss'): string {
    if (!(date instanceof Date)) date = new Date(date.toString());
    let dateString = format
      .replace(/yyyy|YYYY/g, date.getFullYear())
      .replace(/yy|YY/g, date.getYear())
      .replace(/MM/g, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
      .replace(/dd/g, date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
      .replace(/hh/g, date.getHours() > 9 ? date.getHours() : '0' + date.getHours())
      .replace(/mm/g, date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
      .replace(/ss/g, date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
      .replace(/SSS/g, date.getMilliseconds() > 99 ? date.getMilliseconds() :
        (date.getMilliseconds() > 9 ? '0' + date.getMilliseconds() : '00' + date.getMilliseconds()));

    return dateString;
  }

  // yyyy-MM-dd hh:mm:ss:SSS
  static parse (strDate: string, format: string = 'yyyy-MM-dd hh:mm:ss'): Date {
    if (strDate instanceof Date) return strDate;

    let index, year, month, day, hours, minutes, seconds, milliseconds;

    index = format.indexOf('yyyy');
    if (index < 0) index = format.indexOf('YYYY');
    year = index >= 0 ? parseInt(strDate.substr(index, 4)) : 0;

    index = format.indexOf('MM');
    month = index >= 0 ? parseInt(strDate.substr(index, 2)) - 1 : 0;

    index = format.indexOf('dd');
    day = index >= 0 ? parseInt(strDate.substr(index, 2)) : 0;

    index = format.indexOf('hh');
    hours = index >= 0 ? parseInt(strDate.substr(index, 2)) : 0;

    index = format.indexOf('mm');
    minutes = index >= 0 ? parseInt(strDate.substr(index, 2)) : 0;

    index = format.indexOf('ss');
    seconds = index >= 0 ? parseInt(strDate.substr(index, 2)) : 0;

    index = format.indexOf('SSS');
    milliseconds = index >= 0 ? parseInt(strDate.substr(index, 3)) : 0;

    return new Date(year, month, day, hours, minutes, seconds, milliseconds);
  }

  static diff (start: string | Date, end: string | Date = new Date(),
               format: string = 'dd hh:mm:ss'): string {
    if (typeof start == 'string') {
      start = DateUtils.parse(start);
    }
    if (typeof end == 'string') {
      end = DateUtils.parse(end);
    }
    start = start.getTime();
    end = end.getTime();
    let hasDD = format.indexOf('dd') > -1;

    let diff = end - start;

    let dd = diff / (24 * 60 * 60 * 1000);
    let hh = hasDD ? diff % (24 * 60 * 60 * 1000) / (60 * 60 * 1000) : diff / (60 * 60 * 1000);
    let mm = diff % (60 * 60 * 1000) / (60 * 1000);
    let ss = diff % (60 * 1000) / 1000;
    dd = Math.floor(dd);
    hh = Math.floor(hh);
    mm = Math.floor(mm);
    ss = Math.floor(ss);
    return format
      .replace('dd', dd)
      .replace('hh', hh > 9 ? hh : '0' + hh)
      .replace('mm', mm > 9 ? mm : '0' + mm)
      .replace('ss', ss > 9 ? ss : '0' + ss);
  }

  static countDown (start: string | Date, end: string | Date = new Date(),
                    onTick: (fromat: string, diff: string, dd: number, hh: number, mm: number, ss: number) => void,
                    onFinish: () => void): number {
    if (typeof start == 'string') {
      start = DateUtils.parse(start);
    }
    if (typeof end == 'string') {
      end = DateUtils.parse(end);
    }
    start = start.getTime();
    end = end.getTime();
    let sec = 0;
    let handle = setInterval(() => {

      let diff = end - start - sec;
      sec = sec + 1000;
      if (diff < 0) diff = 0;

      let dd = diff / (24 * 60 * 60 * 1000);
      let hh = diff % (24 * 60 * 60 * 1000) / (60 * 60 * 1000);
      let mm = diff % (60 * 60 * 1000) / (60 * 1000);
      let ss = diff % (60 * 1000) / 1000;
      dd = Math.floor(dd);
      hh = Math.floor(hh);
      mm = Math.floor(mm);
      ss = Math.floor(ss);

      let format = `${dd} ${hh}:${mm}:${ss}`;
      onTick && onTick(format, diff, dd, hh, mm, ss);

      if (diff == 0) {
        onFinish && onFinish();
        clearInterval(handle);
      }
    }, 1000);

    return handle;
  }

}

Date.prototype.format = function (format = 'yyyy-MM-dd hh:mm:ss') {
  var date = this;
  var dateString = format
    .replace(/yyyy|YYYY/g, date.getFullYear())
    .replace(/yy|YY/g, date.getYear())
    .replace(/MM/g, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
    .replace(/dd/g, date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
    .replace(/hh/g, date.getHours() > 9 ? date.getHours() : '0' + date.getHours())
    .replace(/mm/g, date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    .replace(/ss/g, date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
    .replace(/SSS/g, date.getMilliseconds() > 99 ? date.getMilliseconds() :
      (date.getMilliseconds() > 9 ? '0' + date.getMilliseconds() : '00' + date.getMilliseconds()));

  return dateString;
};