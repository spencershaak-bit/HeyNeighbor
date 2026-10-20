/*
 * Hey Neighbor — Home / Neighborhood Board
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { mockNeighbors, mockEvents } from '@/services/mockData';

const MOCK_LOGGED_IN = true;
const MOCK_USER = { name: 'You', initials: 'YO' };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [welcomeExpanded, setWelcomeExpanded] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <View style={styles.logoIcon}>
            <MaterialIcons name="home" size={20} color={Colors.textInverse} />
          </View>
          <Text style={styles.logoText}>Hey Neighbor</Text>
        </View>
        <View style={styles.headerRight}>
          {MOCK_LOGGED_IN ? (
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{MOCK_USER.initials}</Text>
            </View>
          ) : (
            <Pressable style={styles.headerBtn}>
              <MaterialIcons name="person-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.headerBtnText}>Profile</Text>
            </Pressable>
          )}
          <Pressable style={styles.planBtn} onPress={() => router.push('/events')}>
            <MaterialIcons name="add" size={16} color={Colors.textInverse} />
            <Text style={styles.planBtnText}>Plan something</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop' }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroLabel}>THE NEIGHBORHOOD BOARD</Text>
            <Text style={styles.heroTitle}>Meet the people{'\n'}who live around you.</Text>
            <Text style={styles.heroSubtitle}>No feed, no drama. Introductions, plans, and a reason to know your neighbors.</Text>
          </View>
        </View>

        {/* New Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionDot, { backgroundColor: Colors.accent }]} />
            <Text style={styles.sectionLabel}>NEW TO THE NEIGHBORHOOD</Text>
          </View>
          <Text style={styles.sectionTitle}>Roll out the welcome mat</Text>
          <Text style={styles.sectionDesc}>
            {mockNeighbors.filter(n => n.yearsInNeighborhood === 0).length} neighbors nearby have chosen to welcome new arrivals.
          </Text>

          {mockNeighbors.filter(n => n.yearsInNeighborhood === 0).length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🏡</Text>
              <Text style={styles.emptyTitle}>The mat is out</Text>
              <Text style={styles.emptyText}>No new arrivals right now. When someone moves in, they will show up here.</Text>
            </View>
          ) : (
            mockNeighbors.filter(n => n.yearsInNeighborhood === 0).map(neighbor => (
              <NeighborCard key={neighbor.id} neighbor={neighbor} isNew />
            ))
          )}
        </View>

        {/* Introductions */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionDot, { backgroundColor: Colors.secondary }]} />
            <Text style={styles.sectionLabel}>NEIGHBOR INTRODUCTIONS</Text>
          </View>
          <Text style={styles.sectionTitle}>Find your neighbors</Text>
          <Text style={styles.sectionDesc}>No feed, no drama — just a friendly hello when you're ready.</Text>

          {mockNeighbors.map(neighbor => (
            <NeighborCard key={neighbor.id} neighbor={neighbor} />
          ))}

          <Pressable style={styles.outlineBtn}>
            <MaterialIcons name="person-add" size={16} color={Colors.secondary} />
            <Text style={[styles.outlineBtnText, { color: Colors.secondary }]}>Write your introduction</Text>
          </Pressable>
        </View>

        {/* Plans on the Board */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.sectionLabel}>{"LET'S DO SOMETHING"}</Text>
          </View>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Plans on the board</Text>
            <Pressable style={styles.accentBtn} onPress={() => router.push('/events')}>
              <MaterialIcons name="add" size={14} color={Colors.textInverse} />
              <Text style={styles.accentBtnText}>Plan something</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionDesc}>A walk, a coffee, a driveway basketball game — small things that make a neighborhood.</Text>

          {mockEvents.slice(0, 2).map(event => (
            <Pressable
              key={event.id}
              style={styles.eventPreviewCard}
              onPress={() => router.push(`/event/${event.id}`)}
            >
              {event.coverImage ? (
                <Image
                  source={{ uri: event.coverImage }}
                  style={styles.eventCover}
                  contentFit="cover"
                  transition={200}
                />
              ) : null}
              <View style={styles.eventPreviewInfo}>
                <View style={styles.eventMeta}>
                  <View style={[styles.categoryBadge, { backgroundColor: Colors.primarySurface }]}>
                    <Text style={[styles.categoryText, { color: Colors.primary }]}>{event.category}</Text>
                  </View>
                  {event.photos.length > 0 && (
                    <View style={styles.photoBadge}>
                      <MaterialIcons name="photo-library" size={12} color={Colors.textMuted} />
                      <Text style={styles.photoBadgeText}>{event.photos.length} photos</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.eventPreviewTitle}>{event.title}</Text>
                <Text style={styles.eventPreviewDate}>{event.date} · {event.time}</Text>
                <Text style={styles.eventPreviewLocation}>📍 {event.location}</Text>
                <View style={styles.eventFooter}>
                  <Text style={styles.attendeeCount}>👥 {event.attendees} going</Text>
                  <View style={[styles.rsvpBadge, event.rsvped ? styles.rsvpActive : styles.rsvpInactive]}>
                    <Text style={[styles.rsvpText, event.rsvped ? styles.rsvpTextActive : styles.rsvpTextInactive]}>
                      {event.rsvped ? '✓ You\'re in' : 'RSVP'}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}

          <Pressable style={styles.viewAllBtn} onPress={() => router.push('/events')}>
            <Text style={styles.viewAllText}>See all events</Text>
            <MaterialIcons name="arrow-forward" size={16} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksGrid}>
          <Pressable style={[styles.quickCard, { backgroundColor: Colors.accentSurface }]} onPress={() => router.push('/yardsales')}>
            <Text style={styles.quickCardEmoji}>🏷️</Text>
            <Text style={styles.quickCardTitle}>Yard Sales</Text>
            <Text style={styles.quickCardSub}>{`${mockNeighbors.length} nearby`}</Text>
          </Pressable>
          <Pressable style={[styles.quickCard, { backgroundColor: Colors.purpleSurface }]} onPress={() => router.push('/village')}>
            <Text style={styles.quickCardEmoji}>🧒</Text>
            <Text style={styles.quickCardTitle}>Village Kids</Text>
            <Text style={styles.quickCardSub}>Care sharing</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Every introduction starts with a hello.{'\n'}When you meet a neighbor, come back and mark it.</Text>
          <Text style={styles.footerTagline}>Hey neighbor — glad you're here.{'\n'}Say hello. Make plans. Be neighbors.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function NeighborCard({ neighbor, isNew = false }: { neighbor: any; isNew?: boolean }) {
  return (
    <View style={styles.neighborCard}>
      <Image
        source={{ uri: neighbor.avatar }}
        style={styles.neighborAvatar}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.neighborInfo}>
        <View style={styles.neighborNameRow}>
          <Text style={styles.neighborName}>{neighbor.name}</Text>
          {isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
          {neighbor.hasKids && <Text style={styles.kidTag}>👶</Text>}
        </View>
        <Text style={styles.neighborAge}>{neighbor.ageRange} · {neighbor.yearsInNeighborhood === 0 ? 'Just moved in' : `${neighbor.yearsInNeighborhood}y here`}</Text>
        <Text style={styles.neighborIntro} numberOfLines={2}>{neighbor.intro}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.sm,
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  planBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.round,
  },
  planBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroBanner: {
    height: 240,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28,25,23,0.55)',
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
  heroLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.accentLight,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textInverse,
    lineHeight: 32,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 1.2,
  },
  sectionTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginBottom: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  neighborCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
    ...Shadow.sm,
  },
  neighborAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.borderLight,
  },
  neighborInfo: {
    flex: 1,
  },
  neighborNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  neighborName: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  newBadge: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.round,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
    letterSpacing: 0.5,
  },
  kidTag: {
    fontSize: 14,
  },
  neighborAge: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  neighborIntro: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  eventPreviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  eventCover: {
    width: '100%',
    height: 160,
  },
  eventPreviewInfo: {
    padding: Spacing.md,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  categoryBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  photoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  photoBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  eventPreviewTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  eventPreviewDate: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  eventPreviewLocation: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendeeCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  rsvpBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  rsvpActive: {
    backgroundColor: Colors.successSurface,
  },
  rsvpInactive: {
    backgroundColor: Colors.primary,
  },
  rsvpText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  rsvpTextActive: {
    color: Colors.success,
  },
  rsvpTextInactive: {
    color: Colors.textInverse,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    marginTop: 4,
  },
  viewAllText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    marginTop: 4,
  },
  outlineBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  accentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.round,
  },
  accentBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 12,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  quickCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
  },
  quickCardEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  quickCardTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  quickCardSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  footer: {
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerTagline: {
    fontSize: FontSize.sm,
    fontStyle: 'italic',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
