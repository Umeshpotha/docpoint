declare module 'nodemailer-express-handlebars' {
    import { Options as NodemailerOptions } from 'nodemailer/lib/mailer';
  
    interface ViewOption {
      viewEngine: any;
      viewPath: string;
      extName?: string;
    }
  
    function nodemailerExpressHandlebars(viewOption: ViewOption): (mail: NodemailerOptions, callback: (err?: Error) => void) => void;
  
    export = nodemailerExpressHandlebars;
  }
  