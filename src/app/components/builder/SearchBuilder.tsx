import { Searchable } from '@/store/types/searchable';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

/**
 *
 * @param Store `Searchable<T>`인터페이스를 구현한 클래스의 인스턴스를 전달하세요.
 * @returns
 */
export function SearchBuilder<T>(Store: InstanceType<new () => Searchable<T>>) {
    return observer(
        ({
            store,
            fetchDataBySearch,
        }: {
            store: typeof Store;
            fetchDataBySearch: (page?: number) => Promise<void>;
        }) => {
            return (
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                >
                    <Grid item xs={2} sx={{ width: '100%' }}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">
                                검색 옵션
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={
                                    store.getSearchType() ??
                                    store.getDefaultCategory()!
                                }
                                label="검색 옵션"
                                onChange={(e: SelectChangeEvent) => {
                                    store.setSearchType(e.target.value as any);
                                }}
                            >
                                {Object.keys(store.getSearchCategories()!).map(
                                    e => {
                                        const items =
                                            store.getSearchCategories()!;
                                        return (
                                            <MenuItem key={e} value={e}>
                                                {items[e]}
                                            </MenuItem>
                                        );
                                    },
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sx={{ width: '100%' }}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <TextField
                                label="검색 내용"
                                value={store.getSearchQuery() ?? ''}
                                onChange={e => {
                                    const { value } = e.target;

                                    if (value === '') {
                                        store.setSearchMode(false);
                                    }

                                    store.setSearchQuery(value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ width: '100%' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ alignSelf: 'center' }}
                            onClick={() => {
                                fetchDataBySearch(1);
                            }}
                        >
                            검색
                        </Button>
                    </Grid>
                </Grid>
            );
        },
    );
}
