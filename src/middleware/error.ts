import { Request, Response, NextFunction, request } from 'express';

export const defaultErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'UnauthorizedError') {
    // 这个需要根据⾃⼰的业务逻辑来处理
    res.send({
      head: {
        code: 0,
        msg: 'Token校验失败',
      },
    });
    //    前端启用log out
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
};
