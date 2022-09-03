export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function time_format(time_send, revert = 'no', time_stamp = 'no') {
  var server_time = new Date('2022/09/03 16:04:10'); //current time
  server_time = Math.floor(server_time.getTime() / 1000);

  if (time_stamp == 'no') {
    var my_date = time_send;
    my_date = my_date.replace(/-/g, "/");
    var d = new Date(my_date);
    var d_time = Math.floor(d.getTime() / 1000);
  } else {
    var d_time = time_send;
  }
  if (revert == 'no') {
    var time = server_time - d_time;
    var time_text = 'trước';
  } else {
    var time = d_time - server_time;
    var time_text = 'nữa';
  }
  if (time <= 60) {
    string = "vài giây " + time_text;
  } else if (time > 60 && time <= (60 * 60)) {
    time_distance = Math.floor(time / 60);
    string = time_distance + " phút " + time_text;
  } else if (time > (60 * 60) && time <= (60 * 60 * 24)) {
    time_distance = Math.floor(time / 60 / 60);
    string = time_distance + " giây " + time_text;
  } else if (time > (60 * 60 * 24)) {
    time_distance = Math.floor(time / 60 / 60 / 24);
    string = time_distance + " ngày " + time_text;
  } else {
    string = 'chưa cập nhật';
  }
  return (string);
}