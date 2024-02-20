import SearchIcon from '@/icons/search.svg'
import useKeyPress from 'hooks/useKey'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChangeEvent, useCallback, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { ROUTES } from '../../../constants'
import useFetch from '../../../hooks/useFetch'
import debounce from '../../../utilities/debounce'
import Icon from '../../Icon/Icon'
import Input from '../../Input/Input'
import styles from './index.module.scss'

const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false })
interface SearchProps {}

const SearchInput = ({}: SearchProps) => {
  useKeyPress('ctrl+k', focusInput)
  useKeyPress('Escape', blurInput, { shouldIgnoreInput: true })
  const [text, setText] = useState('')
  const [searchResult, isSearchResultsLoading] = useFetch<SearchInterface[]>(
    'searchCompany',
    { search: text },
    {
      shouldFetch: !!text,
      shouldShowLoadingOnRefetch: true,
      initialData: [],
      initialLoadingState: false,
    }
  )
  const [isFocused, setIsFocused] = useState(false)

  function blurInput() {
    setIsFocused(false)
    const bar = document.querySelector('#search_bar') as HTMLElement
    if (bar) bar.blur()
  }

  function focusInput() {
    const bar = document.querySelector('#search_bar') as HTMLElement
    if (bar) bar.focus()
  }

  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    }, 300),
    []
  )

  return (
    <ClickAwayListener onClickAway={() => setIsFocused(false)}>
      <div className={styles.wrapper}>
        {isFocused && (
          <div className={styles.search_modal_wrapper}>
            <div className={styles.search_modal}>
              {searchResult.length === 0 && (
                <p className="is-size-7 has-text-grey-light has-text-centered">
                  No Symbol Found
                </p>
              )}
              {searchResult.map((item) => (
                <Link
                  href={`${ROUTES.STOCK}?symbol=${item.equity_symbol}`}
                  key={item.equity_name}
                >
                  <div
                    onClick={() => setIsFocused(false)}
                    className={styles.item}
                  >
                    {item.equity_name} ({item.equity_symbol})
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Input
          isLoading={isSearchResultsLoading}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          id="search_bar"
          placeholder="Search for a name, country, ticker or a function"
          icon={
            <Icon src="/search.svg" className="is-small">
              <SearchIcon />
            </Icon>
          }
        />
      </div>
    </ClickAwayListener>
  )
}
export default SearchInput
