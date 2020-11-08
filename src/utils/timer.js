class Timer {
  timerId = null;

  start = null;

  constructor(callback, delay) {
    this.remaining = delay;
    this.callback = callback;

    this.resume();
  }

  pause() {
    window.clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }
}

export default Timer;
