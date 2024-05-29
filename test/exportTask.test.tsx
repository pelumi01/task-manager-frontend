import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import ExportTask from '../src/components/ExportTask';

describe('Export task', () => {
    it('should render a button with text create new task', () => {
        render(<ExportTask  />)
        const exportButton = screen.getByText('Export');
        const aTag = screen.getByRole('a');
        expect(exportButton).toBeInTheDocument();
        expect(aTag).toBeInTheDocument();
        expect(aTag).toHaveTextContent(/export/i);
    });

}) 