interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'danilo_strvieira@zohomail.com',
      name: 'Danilo do GoStack',
    },
  },
} as IMailConfig;
