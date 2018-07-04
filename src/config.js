module.exports = {
  default_settings : {
    showImage: {
      name: 'Show photo',
      value: true,
      type: 'boolean',
    },
    randomBg: {
      name: 'Random photo',
      value: true,
      tooltip: 'Show a random photo each day',
      type: 'boolean',
    },
    dark: {
      name: 'Dark mode',
      value: true,
      type: 'boolean',
    },
    setDefault: {
      name: 'Set default widgets',
      value: true,
      tooltip: 'Sets default widgets when dashboard is empty',
      type: 'boolean',
    },
    bgColour: {
      name: 'Background color',
      value: '#004080',
      tooltip: 'Background color when photo is not shown',
      type: 'color',
    },
  },
  default_bg : [
    {
      title: 'Background 1',
      filename: '/static/images/background-1.jpg',
    },
    {
      title: 'Background 2',
      filename: '/static/images/background-2.jpg',
    },
    {
      title: 'Background 3',
      filename: '/static/images/background-3.jpg',
    },
    {
      title: 'Background 4',
      filename: '/static/images/background-4.jpg',
    },
    {
      title: 'Background 5',
      filename: '/static/images/background-5.jpg',
    },
    {
      title: 'Background 6',
      filename: '/static/images/background-6.jpg',
    },
    {
      title: 'Background 7',
      filename: '/static/images/background-7.jpg',
    },
    {
      title: 'Background 8',
      filename: '/static/images/background-8.jpg',
    },
    {
      title: 'Background 9',
      filename: '/static/images/background-9.jpg',
    },
    {
      title: 'Background 10',
      filename: '/static/images/background-10.jpg',
    }
  ]
}
