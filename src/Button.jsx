import classnames from 'classnames'

export const BtnRed = (props) => {
  return (
    <button
      {...props}
      className={classnames(
        'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
        'text-sm',
        props.className
      )}
    />
  )
}

export const BtnPrimary = (props) => {
  return (
    <button
      {...props}
      className={
        ('h-7 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
        props.className)
      }
    />
  )
}
