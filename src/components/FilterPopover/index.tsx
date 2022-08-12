import React from 'react';
import { Button, Popover, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { FilterCommentsProps } from '@hooks/useComments';

type FilterProps = {
  popoverOpen: boolean;
  setPopoverOpen: (popoverOpen: boolean) => void;
  onFilter: (filter: FilterCommentsProps) => void;
};

export function FilterPopover({ popoverOpen, setPopoverOpen, onFilter }: FilterProps) {
  return (
    <Popover
      isOpen={popoverOpen}
      onClose={() => setPopoverOpen(!popoverOpen)}
      trigger={triggerProps => {
        return (
          <Button
            m="1"
            w="20"
            size="xs"
            {...triggerProps}
            colorScheme="green"
            onPress={() => setPopoverOpen(true)}
            leftIcon={
              <Icon as={<MaterialIcons name="filter-list-alt" />} color="gray.100" size="4" />
            }
          >
            Filtro
          </Button>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Filtrar comentários" w="56">
        <Popover.Arrow />

        <Popover.Header p="2" _text={{ color: 'gray.600', fontSize: 'sm' }}>
          Ordenar comentários por
        </Popover.Header>

        <Popover.Body justifyContent="flex-end" p="2" shadow="0">
          <Button.Group space={1}>
            <Button colorScheme="green" size="xs" px="2" onPress={() => onFilter('createdAt')}>
              Data
            </Button>

            <Button colorScheme="green" size="xs" px="2" onPress={() => onFilter('amountLike')}>
              Mais curtidas
            </Button>

            <Button px="2" size="xs" colorScheme="green" onPress={() => onFilter('amountDislike')}>
              Menos curtidas
            </Button>
          </Button.Group>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
