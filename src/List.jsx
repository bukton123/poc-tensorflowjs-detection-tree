import numeral from 'numeral'

const List = (props) => {
  return (
    <ul class="w-full mt-10 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {props.data.map((value) => {
        return (
          <li class="pb-3 sm:pb-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full" src={props.image} alt="NeilImage" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate text-purple-700">{value.className}</p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">probability</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 mt-4">
                {numeral(value.probability).format('0.000')}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

List.defaultProps = {
  data: [],
}

export default List
