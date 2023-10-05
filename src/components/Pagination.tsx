import React from 'react';

interface PaginationProps {
    page: number;
    onPageValue: (direction: 'next' | 'prev') => void;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({page, onPageValue, isPrevDisabled, isNextDisabled}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
            <button
                onClick={() => onPageValue('prev')}
                disabled={isPrevDisabled}
            >
                prev
            </button>

            <p style={{ textAlign: 'center' }}>{page}</p>

            <button
                onClick={() => onPageValue('next')}
                disabled={isNextDisabled}
            >
                next
            </button>
        </div>
    );
};

export default Pagination;