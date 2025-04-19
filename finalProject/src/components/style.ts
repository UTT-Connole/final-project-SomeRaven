import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#666',
  },
  divider: {
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 6,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardMeta: {
    fontStyle: 'italic',
    marginTop: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#777',
  },
  touchableListItem: {
    padding: 12,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 8,
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default sharedStyles;